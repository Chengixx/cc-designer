import { describe, it, expect, beforeEach } from "vitest";
import { QueueController } from "../core/queueController";

describe("QueueController", () => {
  let queueController: QueueController;

  beforeEach(() => {
    queueController = new QueueController();
  });

  describe("初始化", () => {
    it("应该正确初始化队列状态", () => {
      expect(queueController.queue.value).toEqual([]);
      expect(queueController.currentIndex.value).toBe(-1);
      expect(queueController.canUndo).toBe(false);
      expect(queueController.canRedo).toBe(false);
      expect(queueController.currentItem).toBe(null);
    });
  });

  describe("push 方法", () => {
    it("应该能添加操作到队列", () => {
      const item = {
        type: "add_element",
        data: { id: "123" },
        description: "添加元素",
      };

      queueController.push(item);

      expect(queueController.queue.value).toHaveLength(1);
      expect(queueController.currentIndex.value).toBe(0);
      expect(queueController.canUndo).toBe(false);
      expect(queueController.canRedo).toBe(false);

      const addedItem = queueController.queue.value[0];
      expect(addedItem.type).toBe("add_element");
      expect(addedItem.data).toEqual({ id: "123" });
      expect(addedItem.description).toBe("添加元素");
      expect(addedItem.id).toBeDefined();
      expect(addedItem.timestamp).toBeDefined();
    });

    it("添加新操作时应该删除后面的操作", () => {
      // 添加三个操作
      queueController.push({ type: "op1", data: {} });
      queueController.push({ type: "op2", data: {} });
      queueController.push({ type: "op3", data: {} });

      // 撤销到第二个操作
      queueController.undo();

      // 添加新操作
      queueController.push({ type: "op4", data: {} });

      expect(queueController.queue.value).toHaveLength(3);
      expect(queueController.queue.value[0].type).toBe("op1");
      expect(queueController.queue.value[1].type).toBe("op2");
      expect(queueController.queue.value[2].type).toBe("op4");
      expect(queueController.currentIndex.value).toBe(2);
    });
  });

  describe("undo 方法", () => {
    it("应该能撤销操作", () => {
      queueController.push({ type: "op1", data: {} });
      queueController.push({ type: "op2", data: {} });

      const undoneItem = queueController.undo();

      expect(undoneItem?.type).toBe("op1");
      expect(queueController.currentIndex.value).toBe(0);
      expect(queueController.canUndo).toBe(false);
      expect(queueController.canRedo).toBe(true);
    });

    it("当没有可撤销的操作时应该返回null", () => {
      const result = queueController.undo();
      expect(result).toBe(null);
    });

    it("当在队列开头时不应该撤销", () => {
      queueController.push({ type: "op1", data: {} });
      queueController.undo(); // 撤销到开头

      const result = queueController.undo();
      expect(result).toBe(null);
      expect(queueController.currentIndex.value).toBe(0);
    });
  });

  describe("redo 方法", () => {
    it("应该能重做操作", () => {
      queueController.push({ type: "op1", data: {} });
      queueController.push({ type: "op2", data: {} });
      queueController.undo(); // 撤销到第一个操作

      const redoneItem = queueController.redo();

      expect(redoneItem?.type).toBe("op2");
      expect(queueController.currentIndex.value).toBe(1);
      expect(queueController.canUndo).toBe(true);
      expect(queueController.canRedo).toBe(false);
    });

    it("当没有可重做的操作时应该返回null", () => {
      const result = queueController.redo();
      expect(result).toBe(null);
    });

    it("当在队列末尾时不应该重做", () => {
      queueController.push({ type: "op1", data: {} });

      const result = queueController.redo();
      expect(result).toBe(null);
      expect(queueController.currentIndex.value).toBe(0);
    });
  });

  describe("clear 方法", () => {
    it("应该清空队列", () => {
      queueController.push({ type: "op1", data: {} });
      queueController.push({ type: "op2", data: {} });

      queueController.clear();

      expect(queueController.queue.value).toEqual([]);
      expect(queueController.currentIndex.value).toBe(-1);
      expect(queueController.canUndo).toBe(false);
      expect(queueController.canRedo).toBe(false);
      expect(queueController.currentItem).toBe(null);
    });
  });

  describe("getItem 方法", () => {
    it("应该能获取指定索引的操作", () => {
      queueController.push({ type: "op1", data: {} });
      queueController.push({ type: "op2", data: {} });

      const item = queueController.getItem(0);
      expect(item?.type).toBe("op1");

      const item2 = queueController.getItem(1);
      expect(item2?.type).toBe("op2");
    });

    it("索引超出范围时应该返回null", () => {
      queueController.push({ type: "op1", data: {} });

      expect(queueController.getItem(-1)).toBe(null);
      expect(queueController.getItem(1)).toBe(null);
    });
  });

  describe("goTo 方法", () => {
    it("应该能跳转到指定索引", () => {
      queueController.push({ type: "op1", data: {} });
      queueController.push({ type: "op2", data: {} });
      queueController.push({ type: "op3", data: {} });

      const result = queueController.goTo(1);
      expect(result).toBe(true);
      expect(queueController.currentIndex.value).toBe(1);
      expect(queueController.currentItem?.type).toBe("op2");
    });

    it("索引超出范围时应该返回false", () => {
      queueController.push({ type: "op1", data: {} });

      expect(queueController.goTo(-1)).toBe(false);
      expect(queueController.goTo(1)).toBe(false);
    });
  });

  describe("getStats 方法", () => {
    it("应该返回正确的统计信息", () => {
      queueController.push({ type: "op1", data: {} });
      queueController.push({ type: "op2", data: {} });

      const stats = queueController.getStats();

      expect(stats).toEqual({
        total: 2,
        current: 2,
        canUndo: true,
        canRedo: false,
        maxSize: 50,
      });
    });

    it("空队列时应该返回正确的统计信息", () => {
      const stats = queueController.getStats();

      expect(stats).toEqual({
        total: 0,
        current: 0,
        canUndo: false,
        canRedo: false,
        maxSize: 50,
      });
    });
  });

  describe("最大容量限制", () => {
    it("应该限制最大容量为50个操作", () => {
      // 添加51个操作
      for (let i = 0; i < 51; i++) {
        queueController.push({ type: `op${i}`, data: {} });
      }

      expect(queueController.queue.value).toHaveLength(50);
      expect(queueController.currentIndex.value).toBe(49);
      expect(queueController.queue.value[0].type).toBe("op1"); // 最旧的操作被删除
      expect(queueController.queue.value[49].type).toBe("op50"); // 最新的操作
    });
  });

  describe("复杂场景测试", () => {
    it("应该正确处理复杂的撤销重做场景", () => {
      // 添加操作
      queueController.push({ type: "add", data: { id: "1" } });
      queueController.push({ type: "add", data: { id: "2" } });
      queueController.push({ type: "add", data: { id: "3" } });

      // 撤销两次
      queueController.undo();
      queueController.undo();

      // 添加新操作
      queueController.push({ type: "add", data: { id: "4" } });

      expect(queueController.queue.value).toHaveLength(2);
      expect(queueController.queue.value[0].data.id).toBe("1");
      expect(queueController.queue.value[1].data.id).toBe("4");
      expect(queueController.canRedo).toBe(false);
    });

    it("应该在撤销后添加新操作时清除重做历史", () => {
      queueController.push({ type: "op1", data: {} });
      queueController.push({ type: "op2", data: {} });
      queueController.push({ type: "op3", data: {} });

      // 撤销到第一个操作
      queueController.undo();
      queueController.undo();

      // 此时应该可以重做
      expect(queueController.canRedo).toBe(true);

      // 添加新操作
      queueController.push({ type: "op4", data: {} });

      // 此时不应该可以重做
      expect(queueController.canRedo).toBe(false);
    });
  });
});
