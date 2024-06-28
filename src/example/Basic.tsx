import Scroll from "../component";

const dummyItems = Array.from(
  { length: 150 },
  (_, index) => `dummy-item-${index + 1}`
);

const BasicExample = () => {
  return (
    <Scroll width={"300px"} height={"300px"}>
      {dummyItems.map((item) => (
        <div key={`key-${item}`}>{item}</div>
      ))}
    </Scroll>
  );
};
export default BasicExample;
