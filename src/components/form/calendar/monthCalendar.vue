<template>
    <div class="input-box">
        <div
            class="datepicker-input"
            v-on:click="setup.isShow = (setup.isShow !== true)"
        >
            <input
                type="text"
                autocomplete="off"
                placeholder="날짜를 선택해주세요."
                :value="selectedDateText"
                readonly
            >
            <i class="icon"></i>
        </div>
        <div
            class="wim-datepicker month"
            v-bind:class="{
                show : setup.isShow,
            }"
        >
            <div class="calendars">
                <div class="calendar">
                    <div class="calendar-table">
                        <table>
                            <thead>
                                <tr>
                                    <th
                                        class="prev"
                                        @click="arrowDateChange('prev', 1)"
                                    >
                                        <i class="fas fa-caret-left"></i>
                                    </th>
                                    <th colspan="2">
                                        <div class="flex-c">
                                            <Select
                                                class="pull"
                                                :datas="setup.yearList"
                                                :value="setup.selectDate.year"
                                                @update="setup.selectDate.year = $event.value"
                                            />
                                        </div>
                                    </th>
                                    <th
                                        class="next"
                                        @click="arrowDateChange('next', 1)"
                                    >
                                        <i class="fas fa-caret-right"></i>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(item, index) in 3"
                                    v-bind:key="item"
                                >
                                    <td
                                        v-for="(month) in 4"
                                        v-bind:key="`${item}.month${month}`"
                                        v-bind:class="{
                                            'active-date' : Number(setup.defaultMonth) === (4 * index) + month || setup.selectDate.month === (4 * index) + month,
                                        }"
                                        v-on:click="monthSelect((4 * index) + month)"
                                    >{{ (4 * index) + month }}월</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import Select from "@/components/form/Select";
    import { computed, reactive, defineEmit } from "vue";

    const emit = defineEmit(["update"]);

    const setup = reactive({
        isShow: false,
        yearList: [],
        defaultYear: $moment().year(),
        defaultMonth: $moment().add(1, "month").month(),
        selectDate: {
            year: $moment().year(),
            month: $moment().add(1, "month").month(),
        },
    });

    const getYear = () => {
        const currentYear = $moment();
        const startYear = Number(
            $moment(currentYear).subtract(10, "years").year()
        );
        const endYear = Number(
            $moment(currentYear).add(10, "years").year()
        );
        setup.yearList = Array(endYear - startYear)
            .fill()
            .map((_, i) => ({
                key: i,
                value: startYear + i,
            }));
    };

    const monthSelect = (month) => {
        
        setup.selectDate.month = month;
        setup.defaultYear = setup.selectDate.year;
        setup.defaultMonth = setup.selectDate.month;
        setup.isShow = false;

        emit("update",selectedDateText);
    };

    const selectedDateText = computed(
        () => `${setup.defaultYear} / ${setup.defaultMonth}`
    );

    const arrowDateChange = (direction, movingYear) => {
        switch (direction) {
        case "prev":
            setup.selectDate.year = $moment([setup.selectDate.year]).subtract(1, "years").year();
            break;
        case "next":
            setup.selectDate.year = $moment([setup.selectDate.year]).add(1, "years").year();
            break;
        }
    };

    getYear();
</script>