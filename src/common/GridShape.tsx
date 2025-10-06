export default function GridShape() {
  return (
    <>
      <div className="laptop:max-w-[450px] absolute top-0 right-0 -z-1 w-full max-w-[250px]">
        <img src="/img/shape/grid-01.svg" alt="grid" />
      </div>
      <div className="laptop:max-w-[450px] absolute bottom-0 left-0 -z-1 w-full max-w-[250px] rotate-180">
        <img src="/img/shape/grid-01.svg" alt="grid" />
      </div>
    </>
  );
}
