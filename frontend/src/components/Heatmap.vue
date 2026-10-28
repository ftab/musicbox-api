<template>
    <svg class="heatmap" :viewBox="`0 0 ${width} ${height}`">
        <rect
            v-for="cell in cells"
            :key="cell.date"
            :x="cell.x"
            :y="cell.y"
            :width="size"
            :height="size"
            rx="2"
            :class="'level-' + cell.level"
        >
            <title :id="cell.date">{{ cell.count }} songs on {{ formatDay(cell.date) }}</title>
        </rect>
    </svg>
</template>

<script setup>
    import { computed } from 'vue';
    import { formatDay } from '../utils';

    const props = defineProps({
        data: {
            type: Array,
            required: true,
        },
    });

    const size = 11;
    const gap = 3;
    const step = size + gap;
    const weeks = 53;
    const levels = 4;
    const width = weeks * step - gap;
    const height = 7 * step - gap;

    const cells = computed(() => {
        const counts = new Map(props.data.map(d => [d.date, d.count]));
        const max = Math.max(1, ...counts.values());
        const cell = [];

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const lastCol = new Date(today);
        lastCol.setDate(today.getDate() + (6 - today.getDay()));

        const start = new Date(lastCol);
        start.setDate(lastCol.getDate() - weeks * 7 + 1);

        for(let i = 0; i < weeks * 7; i++) {
            let date = new Date(start);

            date.setDate(start.getDate() + i);

            if(date > today) break;

            date = date.toLocaleDateString('sv');

            const count = counts.get(date) || 0;
            const level = count ? Math.ceil((count / max) * (levels - 1)) : 0;

            cell.push({
                date,
                count,
                x: Math.floor(i / 7) * step,
                y: (i % 7) * step,
                level,
            });
        }

        return cell;
    });
</script>
