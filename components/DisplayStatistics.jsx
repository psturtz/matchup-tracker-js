import { useSession } from "next-auth/react";

import category from "@utils/alias";

const Display = ({stats}) => {
  const { data: session} = useSession();
  console.log(session)
  
  return (
    <section className="order-last flex-initial md:order-none w-full md:w-3/6 border border-primary-black bg-primary-black rounded-md mx-2 lg:mx-4 md:px-10 py-8 px-6 shadow-md">
      <p className="text-center -mt-4 mb-4 text-2xl text-primary-white text-bold">Statistics</p>
      <div className="flex-initial flex flex-col gap-4 w-full">
      {Object.keys(stats).map((el) => {
        if (session?.user?.settings?.stats[el]) {
          return (
            <div key={el} className='flex flex-initial flex-nowrap mx-4 items-center justify-between'>
              <div className="bg-primary-white rounded px-2 py-1 mr-2 text-xs my-2 max-w-[68%]">{category[el]}:</div> 
              <div className="text-primary-teal font-bold text-lg">{stats[el]}</div>
            </div>
          )
        }
      })}
      </div>
    </section>
  )
};

export default Display;
