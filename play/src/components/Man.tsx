//@ts-nocheck
import { defineComponent } from "vue";

const Man = defineComponent({
  setup(props, { attrs }) {
    console.log(attrs);
    return () => (
      <div>
        {/* <div>{JSON.stringify(attrs)}</div> */}
        <div>{attrs.elementSchema.props.value}</div>
      </div>
    );
  },
});

export default Man;
