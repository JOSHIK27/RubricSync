"use client";
import { ResponsiveBar } from "@nivo/bar";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const data = [
  {
    country: "AD",
    "hot dog": 57,
    "hot dogColor": "hsl(75, 70%, 50%)",
    burger: 52,
    burgerColor: "hsl(218, 70%, 50%)",
    sandwich: 72,
    sandwichColor: "hsl(149, 70%, 50%)",
    kebab: 148,
    kebabColor: "hsl(56, 70%, 50%)",
    fries: 140,
    friesColor: "hsl(337, 70%, 50%)",
    donut: 164,
    donutColor: "hsl(102, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 66,
    "hot dogColor": "hsl(342, 70%, 50%)",
    burger: 3,
    burgerColor: "hsl(37, 70%, 50%)",
    sandwich: 69,
    sandwichColor: "hsl(139, 70%, 50%)",
    kebab: 138,
    kebabColor: "hsl(81, 70%, 50%)",
    fries: 142,
    friesColor: "hsl(284, 70%, 50%)",
    donut: 78,
    donutColor: "hsl(84, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 180,
    "hot dogColor": "hsl(293, 70%, 50%)",
    burger: 113,
    burgerColor: "hsl(347, 70%, 50%)",
    sandwich: 9,
    sandwichColor: "hsl(254, 70%, 50%)",
    kebab: 58,
    kebabColor: "hsl(350, 70%, 50%)",
    fries: 29,
    friesColor: "hsl(215, 70%, 50%)",
    donut: 172,
    donutColor: "hsl(46, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 8,
    "hot dogColor": "hsl(86, 70%, 50%)",
    burger: 177,
    burgerColor: "hsl(220, 70%, 50%)",
    sandwich: 134,
    sandwichColor: "hsl(249, 70%, 50%)",
    kebab: 80,
    kebabColor: "hsl(164, 70%, 50%)",
    fries: 137,
    friesColor: "hsl(319, 70%, 50%)",
    donut: 82,
    donutColor: "hsl(222, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 143,
    "hot dogColor": "hsl(236, 70%, 50%)",
    burger: 107,
    burgerColor: "hsl(171, 70%, 50%)",
    sandwich: 179,
    sandwichColor: "hsl(341, 70%, 50%)",
    kebab: 87,
    kebabColor: "hsl(98, 70%, 50%)",
    fries: 165,
    friesColor: "hsl(312, 70%, 50%)",
    donut: 52,
    donutColor: "hsl(104, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 87,
    "hot dogColor": "hsl(157, 70%, 50%)",
    burger: 148,
    burgerColor: "hsl(57, 70%, 50%)",
    sandwich: 61,
    sandwichColor: "hsl(15, 70%, 50%)",
    kebab: 94,
    kebabColor: "hsl(315, 70%, 50%)",
    fries: 120,
    friesColor: "hsl(318, 70%, 50%)",
    donut: 121,
    donutColor: "hsl(64, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 121,
    "hot dogColor": "hsl(270, 70%, 50%)",
    burger: 41,
    burgerColor: "hsl(115, 70%, 50%)",
    sandwich: 21,
    sandwichColor: "hsl(70, 70%, 50%)",
    kebab: 63,
    kebabColor: "hsl(295, 70%, 50%)",
    fries: 48,
    friesColor: "hsl(158, 70%, 50%)",
    donut: 127,
    donutColor: "hsl(314, 70%, 50%)",
  },
];

export const MyResponsiveBar = ({ data /* see data tab */ }: { data: any }) => (
  <div className="w-full h-[500px]">
    <ResponsiveBar
      data={data}
      keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "country",
        legendPosition: "middle",
        legendOffset: 32,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "food",
        legendPosition: "middle",
        legendOffset: -40,
        truncateTickAt: 0,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in country: " + e.indexValue
      }
    />
  </div>
);
