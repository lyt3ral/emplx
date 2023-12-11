import Link from "next/link";

export default function Header() {
  return (
    <div className="flex w-full flex-col items-center justify-evenly gap-1 border-b border-black py-4 font-mono md:flex-row md:items-baseline">
      {/* <section className="flex items-baseline justify-between gap-2"> */}
      <Link href={`/`}>
        <p className="text-3xl">
          <span className="font-bold hover:underline">Emplx</span>📝
        </p>
      </Link>
      {/* <Image src={`/employee.png`} width={25} height={25} alt="logo"></Image> */}
      {/* </section> */}
      <section className="flex gap-4 ">
        <Link href={`/employee`} className="hover:underline" >
          employees
        </Link>
        <Link href={`/department`} className="hover:underline">
          departments
        </Link>
      </section>
    </div>
  );
}
