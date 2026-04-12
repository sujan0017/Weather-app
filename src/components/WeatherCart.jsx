import React from "react";

function WeatherCart({ icon, data, title }) {
  return (
    <div className="m-w-44 mx-auto flex flex-col items-center flex-wrap">
      <div className="flex gap-2 dark:text-white">
        {icon} {title}
      </div>
      <div className="flex gap-2 dark:text-white">{data}</div>
    </div>
  );
}

export default WeatherCart;
