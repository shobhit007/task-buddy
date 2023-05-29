function FormComponent({ children, heading, ...otherProps }) {
  return (
    <div className="2xl:pt-36 2xl:pb-8 xl:pt-24 xl:pb-12 pt-16 pb-8 ">
      <div className="max-w-md my-0 mx-auto">
        <div className="xl:py-14 xl:px-8 md:px-6 md:py-12 md:bg-gray-200 md:rounded-lg px-4">
          <div className="py-4">
            <h1 className="text-4xl font-semibold text-black tracking-wide">
              {heading}
            </h1>
          </div>
          <form className="w-full" {...otherProps}>
            {children}
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormComponent;
