/**
 * Chart presets - 常见图表配置预设
 * 配合 EChart.astro 使用，快速生成常用图表
 */

import type { EChartsOption } from "echarts";

interface PieChartData {
    name: string;
    value: number;
}

interface BarChartData {
    categories: string[];
    series: { name: string; data: number[] }[];
}

interface LineChartData {
    categories: string[];
    series: { name: string; data: number[]; smooth?: boolean }[];
}

interface RadarData {
    indicators: { name: string; max: number }[];
    series: { name: string; value: number[] }[];
}

interface GaugeData {
    value: number;
    min?: number;
    max?: number;
    name?: string;
}

interface FunnelData {
    name: string;
    value: number;
}

interface TreeMapData {
    name: string;
    value: number;
    children?: TreeMapData[];
}

/**
 * 饼图配置
 */
export function createPieChart(
    data: PieChartData[],
    title: string = "",
    subtitle: string = "",
): EChartsOption {
    return {
        title: { text: title, subtext: subtitle, left: "center" },
        tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
        legend: { bottom: "0%", left: "center" },
        series: [
            {
                type: "pie",
                radius: ["40%", "70%"],
                avoidLabelOverlap: true,
                itemStyle: { borderRadius: 6, borderColor: "var(--bg-page)", borderWidth: 2 },
                label: { show: true, formatter: "{b}\n{d}%" },
                labelLine: { show: true },
                emphasis: {
                    label: { show: true, fontSize: "16", fontWeight: "bold" },
                    itemStyle: { shadowBlur: 10, shadowColor: "rgba(0, 0, 0, 0.3)" },
                },
                data,
            },
        ],
    };
}

/**
 * 柱状图配置
 */
export function createBarChart(
    data: BarChartData,
    title: string = "",
    subtitle: string = "",
): EChartsOption {
    return {
        title: { text: title, subtext: subtitle, left: "center" },
        tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
        legend: { data: data.series.map((s) => s.name), bottom: 0 },
        grid: { left: "3%", right: "4%", bottom: "12%", containLabel: true },
        xAxis: {
            type: "category",
            data: data.categories,
            axisTick: { alignWithLabel: true },
        },
        yAxis: { type: "value" },
        series: data.series.map((s) => ({
            name: s.name,
            type: "bar",
            data: s.data,
            itemStyle: { borderRadius: [4, 4, 0, 0] },
            emphasis: { focus: "series" },
        })),
    };
}

/**
 * 折线图配置
 */
export function createLineChart(
    data: LineChartData,
    title: string = "",
    subtitle: string = "",
): EChartsOption {
    return {
        title: { text: title, subtext: subtitle, left: "center" },
        tooltip: { trigger: "axis" },
        legend: { data: data.series.map((s) => s.name), bottom: 0 },
        grid: { left: "3%", right: "4%", bottom: "12%", containLabel: true },
        xAxis: {
            type: "category",
            data: data.categories,
            boundaryGap: false,
        },
        yAxis: { type: "value" },
        series: data.series.map((s) => ({
            name: s.name,
            type: "line",
            data: s.data,
            smooth: s.smooth !== false,
            areaStyle: { opacity: 0.1 },
            emphasis: { focus: "series" },
        })),
    };
}

/**
 * 雷达图配置
 */
export function createRadarChart(
    data: RadarData,
    title: string = "",
    subtitle: string = "",
): EChartsOption {
    return {
        title: { text: title, subtext: subtitle, left: "center" },
        tooltip: { trigger: "item" },
        legend: { bottom: 0 },
        radar: { indicator: data.indicators },
        series: [
            {
                type: "radar",
                data: data.series.map((s) => ({ name: s.name, value: s.value })),
                emphasis: { areaStyle: { opacity: 0.3 } },
            },
        ],
    };
}

/**
 * 仪表盘配置
 */
export function createGaugeChart(
    data: GaugeData,
    title: string = "",
    subtitle: string = "",
): EChartsOption {
    return {
        title: { text: title, subtext: subtitle, left: "center" },
        series: [
            {
                type: "gauge",
                min: data.min ?? 0,
                max: data.max ?? 100,
                progress: { show: true, width: 14 },
                axisLine: { lineStyle: { width: 14 } },
                axisTick: { show: false },
                splitLine: { length: 10, lineStyle: { width: 2 } },
                detail: {
                    valueAnimation: true,
                    formatter: "{value}%",
                    fontSize: 24,
                    offsetCenter: [0, "70%"],
                },
                data: [{ value: data.value, name: data.name || "" }],
            },
        ],
    };
}

/**
 * 漏斗图配置
 */
export function createFunnelChart(
    data: FunnelData[],
    title: string = "",
    subtitle: string = "",
): EChartsOption {
    return {
        title: { text: title, subtext: subtitle, left: "center" },
        tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
        legend: { bottom: 0 },
        series: [
            {
                type: "funnel",
                left: "15%",
                top: 40,
                bottom: 40,
                width: "70%",
                min: 0,
                max: Math.max(...data.map((d) => d.value)),
                minSize: "0%",
                maxSize: "100%",
                sort: "descending",
                gap: 4,
                label: { show: true, position: "inside" },
                labelLine: { length: 10, lineStyle: { width: 1 } },
                itemStyle: { borderRadius: 4 },
                emphasis: {
                    label: { fontSize: 14, fontWeight: "bold" },
                    itemStyle: { shadowBlur: 10, shadowColor: "rgba(0, 0, 0, 0.3)" },
                },
                data,
            },
        ],
    };
}

/**
 * 树形图配置
 */
export function createTreeMapChart(
    data: TreeMapData[],
    title: string = "",
    subtitle: string = "",
): EChartsOption {
    return {
        title: { text: title, subtext: subtitle, left: "center" },
        tooltip: { trigger: "item", formatter: "{b}: {c}" },
        series: [
            {
                type: "treemap",
                width: "90%",
                height: "80%",
                breadcrumb: { show: true, top: "bottom", height: 24 },
                roam: false,
                nodeClick: false,
                universalTransition: true,
                levels: [
                    {
                        itemStyle: {
                            borderColor: "var(--bg-surface)",
                            borderWidth: 2,
                            gapWidth: 2,
                        },
                    },
                    { colorAlpha: 0.6 },
                ],
                data,
            },
        ],
    };
}
