import { defineComponent, computed } from 'vue';

const SvgIcon = defineComponent({
  props: {
    name: {
      type: String,
      required: true
    },
    className: {
      type: String
    }
  },
  setup(props) {
    //这里要和vite配置里的一样
    const iconName = computed(() => `#icon-${props.name}`);

    return () => {
      return (
        <svg class={[
          props.className,
          "c-w-[16px] c-h-[16px] c-fill-current c-overflow-hidden c-inline-block"
        ]} aria-hidden="true">
          <use xlinkHref={iconName.value} />
        </svg>
      );
    }
  }
});

export default SvgIcon;