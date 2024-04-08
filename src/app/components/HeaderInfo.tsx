import React from 'react';

const HeaderInfo = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-y-3">
        <h1 className="text-5xl tracking-tight font-bold">Hono ⚡️ Redis</h1>
        <h4 className="text-3xl tracking-tight font-bold bg-gradient-to-r from-yellow-400 via-yellow-400  to-orange-300 text-transparent bg-clip-text ">
          REST API
        </h4>
      </div>
      <p className="text-zinc-600 text-md max-w-prose text-center">
        Globally distributed high-performance REST API for speed search
        <br /> Type a query below and get your results in miliseconds.
      </p>
    </>
  );
};

export default HeaderInfo;
