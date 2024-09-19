import { MyResponsiveBar } from "@/components/barChart";
import { data } from "@/components/barChart";
import { MyResponsiveRadar } from "@/components/radarChart";

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <MyResponsiveBar data={data} />
      <MyResponsiveRadar
        data={[
          {
            taste: "fruity",
            chardonay: 41,
            carmenere: 53,
            syrah: 60,
          },
          {
            taste: "bitter",
            chardonay: 55,
            carmenere: 44,
            syrah: 114,
          },
          {
            taste: "heavy",
            chardonay: 69,
            carmenere: 92,
            syrah: 36,
          },
          {
            taste: "strong",
            chardonay: 104,
            carmenere: 68,
            syrah: 82,
          },
          {
            taste: "sunny",
            chardonay: 115,
            carmenere: 28,
            syrah: 50,
          },
        ]}
      />
    </div>
  );
}
