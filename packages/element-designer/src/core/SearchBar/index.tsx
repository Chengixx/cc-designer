import { ElementManage, FocusManage, HoverManage } from "@cgx-designer/hooks";
import { defineComponent, ref, computed, inject, nextTick, watch } from "vue";
import { elementController } from "@cgx-designer/controller";
import { onClickOutside } from "@vueuse/core";

const SearchBar = defineComponent({
  setup(_, { expose }) {
    const elementManage = inject("elementManage") as ElementManage;
    const focusManage = inject("focusManage") as FocusManage;
    const hoverManage = inject("hoverManage") as HoverManage;
    const isVisible = ref(false);
    const searchValue = ref("");
    const inputRef = ref<HTMLInputElement>();
    const searchBarRef = ref<HTMLDivElement>();

    // 拖拽相关状态
    const isDragging = ref(false);
    const dragOffset = ref({ x: 0, y: 0 });
    const position = ref({ x: 0, y: 0 });

    // 暴露控制方法
    const show = () => {
      isVisible.value = true;
      // 重置位置到屏幕中间
      const centerX = (window.innerWidth - 384) / 2; // 搜索栏宽度384px
      const centerY = window.innerHeight / 3; // 屏幕高度的1/3
      position.value = { x: centerX, y: centerY };
      // 自动获取焦点
      nextTick(() => {
        inputRef.value?.focus();
      });
    };

    const hide = () => {
      isVisible.value = false;
      searchValue.value = ""; // 隐藏时清空搜索内容
      // 重置拖拽状态
      isDragging.value = false;
    };

    // 暴露方法给父组件
    expose({
      show,
      hide,
    });

    // 拖拽开始
    const handleMouseDown = (e: MouseEvent) => {
      // 检查是否点击在拖拽手柄上
      const target = e.target as HTMLElement;
      if (!target.classList.contains("drag-handle")) {
        return;
      }

      isDragging.value = true;
      const rect = searchBarRef.value?.getBoundingClientRect();
      if (rect) {
        dragOffset.value = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }
      e.preventDefault();
    };

    // 拖拽中
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.value) return;

      const newX = e.clientX - dragOffset.value.x;
      const newY = e.clientY - dragOffset.value.y;

      // 限制在屏幕范围内
      const maxX = window.innerWidth - 384; // 搜索栏宽度
      const maxY = window.innerHeight - 200; // 搜索栏高度

      position.value = {
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      };
    };

    // 拖拽结束
    const handleMouseUp = () => {
      isDragging.value = false;
    };

    // 添加全局鼠标事件监听
    const addGlobalListeners = () => {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const removeGlobalListeners = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // 监听拖拽状态变化
    watch(isDragging, (newValue) => {
      if (newValue) {
        addGlobalListeners();
      } else {
        removeGlobalListeners();
      }
    });

    // 搜索结果
    const searchResults = computed(() => {
      if (!searchValue.value.trim()) return [];

      const query = searchValue.value.toLowerCase();
      return elementManage.elementList.value.filter((element) => {
        const id = element.id?.toLowerCase() || "";
        const key = element.key?.toLowerCase() || "";

        // 获取元素的中文标签
        const elementConfig = elementController.getElementConfig(element.key);
        const label = elementConfig?.label?.toLowerCase() || "";

        return (
          id.includes(query) || key.includes(query) || label.includes(query)
        );
      });
    });

    // 处理搜索输入
    const handleSearch = (e: Event) => {
      const target = e.target as HTMLInputElement;
      searchValue.value = target.value;
    };

    // 处理搜索结果点击
    const handleResultClick = (element: any) => {
      // 选中元素
      focusManage.handleFocus(element);
      hide();
    };

    // 处理搜索结果悬停
    const handleResultHover = (e: MouseEvent, element: any) => {
      hoverManage.handleHover(e, element);
    };

    // 处理搜索结果离开
    const handleResultLeave = (e: MouseEvent) => {
      hoverManage.handleCancelHover(e);
    };

    // 处理键盘事件
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        hide();
      }
    };

    // 计算样式
    const searchBarStyle = computed(() => ({
      display: isVisible.value ? "flex" : "none",
      position: "fixed" as const,
      top: `${position.value.y}px`,
      left: `${position.value.x}px`,
      transform: "none",
      zIndex: 50,
    }));

    onClickOutside(searchBarRef, hide);
    return () => (
      <div class="c-z-50" style={searchBarStyle.value} ref={searchBarRef}>
        <div class="c-bg-[rgba(44,47,51,.9)] c-rounded-lg c-p-3 c-w-96 c-shadow-lg c-border c-border-gray-600 c-relative">
          {/* 拖拽手柄 */}
          <div
            class="drag-handle c-absolute c-top-1 c-left-1/2 c-transform -c-translate-x-1/2 c-w-12 c-h-2 c-bg-blue-500 c-rounded-full c-opacity-80 hover:c-opacity-100 hover:c-bg-blue-400 c-cursor-grab active:c-cursor-grabbing c-transition-all"
            onMousedown={handleMouseDown}
            title="拖拽移动"
            style={{ cursor: isDragging.value ? "grabbing" : "grab" }}
          />

          <div class="c-flex c-items-center c-gap-3 c-mt-2">
            {/* 关闭按钮 */}
            <div
              class="c-w-6 c-h-6 c-flex c-items-center c-justify-center c-text-gray-400 hover:c-text-white c-cursor-pointer c-transition-colors c-rounded hover:c-bg-[rgba(255,255,255,.1)]"
              onClick={hide}
            >
              <svg
                class="c-w-4 c-h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            {/* 搜索输入框 */}
            <div class="c-relative c-flex-1">
              <input
                ref={inputRef}
                type="text"
                placeholder="搜索..."
                value={searchValue.value}
                onInput={handleSearch}
                onKeydown={handleKeydown}
                class="c-w-full c-px-3 c-py-2 c-bg-transparent c-text-white c-rounded c-border-none c-outline-none c-placeholder-gray-400 c-text-sm"
              />
              <div class="c-absolute c-right-3 c-top-1/2 c-transform -c-translate-y-1/2 c-text-gray-400">
                <svg
                  class="c-w-4 c-h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* 搜索结果列表 */}
          {searchResults.value.length > 0 && (
            <div class="c-mt-2 c-max-h-32 c-overflow-y-auto c-bg-[rgba(44,47,51,.9)] c-rounded c-border c-border-gray-600">
              {searchResults.value.map((element, index) => (
                <div
                  key={element.id || index}
                  class="c-px-3 c-py-2 c-text-white c-text-sm c-cursor-pointer hover:c-bg-[rgba(255,255,255,.1)] c-transition-colors c-border-b c-border-gray-600 last:c-border-b-0"
                  onClick={() => handleResultClick(element)}
                  onMouseenter={(e: MouseEvent) =>
                    handleResultHover(e, element)
                  }
                  onMouseleave={handleResultLeave}
                >
                  <div class="c-flex c-items-center c-gap-2">
                    <div class="c-w-2 c-h-2 c-bg-blue-500 c-rounded-full"></div>
                    <div class="c-flex-1">
                      <div class="c-font-medium">
                        {elementController.getElementConfig(element.key)
                          ?.label || element.key}
                      </div>
                      <div class="c-text-xs c-text-gray-400">
                        {element.key}
                        {element.id && ` • ID: ${element.id}`}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
});

export default SearchBar;
