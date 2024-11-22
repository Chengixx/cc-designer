import { Ref } from "vue";

/**
 * useExpose hook
 * @param {Ref<any>} elementRef 接受一个ref
 * @returns 返回的是代理对象
 */
export function useExpose<T>(elementRef: Ref<T | null>) {
  return new Proxy(
    {},
    {
      //使用的时候 直接返回实例中的属性或者方法
      get(_, key) {
        return elementRef.value?.[key];
      },
      //这个是因为vue中做了特殊处理 所以需要对实例对象进行特殊处理
      has(_, key) {
        return key in (elementRef.value || {});
      },
      //请注意 我们需要对实例对象进行特殊处理的话 必须也要实现set方法，否则会被proxy拦截
      set(_, key, value) {
        if (elementRef.value) {
          elementRef.value[key] = value;
          return true;
        }
        return false;
      },
    }
  );
}
