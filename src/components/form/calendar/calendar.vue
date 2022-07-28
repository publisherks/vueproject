<template>
    <div class="input-box">
        <div
            class="datepicker-input"
            v-on:click="setDatepicker('calendar',!datepicker.calendar); resizeCalendar($event);"
        >
            <input
                :value="datepicker.selectedDateText"
                type="text"
                autocomplete="off"
                :placeholder="props.placeholder"
                readonly
            >
            <i class="icon"></i>
        </div>
        <div
            ref="calendar"
            class="wim-datepicker"
            :class="{ show : datepicker.calendar,
                      single : !datepicker.range,
                      right  : datepicker.arrowRight}"
        >
            <div
                class="calendars"
            >
                <div class="calendar left">
                    <div class="calendar-table">
                        <table>
                            <thead>
                                <tr>
                                    <th
                                        class="prev"
                                        @click="arrowDateChange('left' , 1 , 'left')"
                                    >
                                        <i class="fas fa-caret-left"></i>
                                    </th>
                                    <th colspan="5">
                                        <div class="flex">
                                            <div class="input-box">
                                                <div
                                                    class="select-input"
                                                    :class="{ open : datepicker.monthSelectBox.left }"
                                                    v-on:blur="datepicker.monthSelectBox.left = false"
                                                    v-on:click="datepicker.monthSelectBox.left = !datepicker.monthSelectBox.left"
                                                >
                                                    <input
                                                        :value="`${datepicker.defaultMonth.left}월`"
                                                        type="text"
                                                        readonly
                                                    >
                                                    <a
                                                        href="#"
                                                        class="icon"
                                                    ></a>
                                                </div>
                                                <div
                                                    class="select-items"
                                                >
                                                    <ul>
                                                        <li
                                                            v-for="i in 12"
                                                            v-bind:key="i"
                                                        >
                                                            <a
                                                                href="#"
                                                                v-on:click="datepicker.monthSelectBox.left = false;
                                                                            datepicker.defaultMonth.left = fillZero(2,String(i));
                                                                            drawACalendar('left')"
                                                            >{{ fillZero(2, String(i)) }}월</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="input-box">
                                                <div
                                                    class="select-input"
                                                    :class="{ open : datepicker.yearSelectBox.left }"
                                                    v-on:blur="datepicker.yearSelectBox.left = false"
                                                    v-on:click="datepicker.yearSelectBox.left = !datepicker.yearSelectBox.left"
                                                >
                                                    <input
                                                        :value="`${datepicker.defaultYear.left}년`"
                                                        type="text"
                                                        readonly
                                                    >
                                                    <a
                                                        href="#"
                                                        class="icon"
                                                    ></a>
                                                </div>
                                                <div
                                                    class="select-items"
                                                >
                                                    <ul>
                                                        <li
                                                            v-for="y in importYear"
                                                            v-bind:key="y"
                                                        >
                                                            <a
                                                                href="#"
                                                                v-on:click="datepicker.yearSelectBox.left = false;
                                                                            datepicker.defaultYear.left = `${y}`;
                                                                            drawACalendar('left')"
                                                            >{{ y }}년</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                    <th
                                        class="next"
                                        @click="arrowDateChange('right' , 1 , 'left')"
                                    >
                                        <i class="fas fa-caret-right"></i>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>일</th>
                                    <th>월</th>
                                    <th>화</th>
                                    <th>수</th>
                                    <th>목</th>
                                    <th>금</th>
                                    <th>토</th>
                                </tr>
                                <tr
                                    v-for="dateObjects in datepicker.date.left"
                                    :key="dateObjects.week"
                                >
                                    <td
                                        v-for="dateObject in dateObjects.days"
                                        :key="dateObject.date"
                                        :class="dateObject.class()"
                                        @click="setDateRangePicker(dateObject.date)"
                                    >{{ getDateOfDay(dateObject.date) }}
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div
                    v-if="datepicker.range"
                    class="calendar right"
                >
                    <div class="calendar-table">
                        <table>
                            <thead>
                                <tr>
                                    <th
                                        class="prev"
                                        @click="arrowDateChange('left' , 1 , 'right')"
                                    >
                                        <i class="fas fa-caret-left"></i>
                                    </th>
                                    <th colspan="5">
                                        <div class="flex">
                                            <div class="input-box">
                                                <div
                                                    class="select-input"
                                                    :class="{ open : datepicker.monthSelectBox.right }"
                                                    v-on:blur="datepicker.monthSelectBox.right = false"
                                                    v-on:click="datepicker.monthSelectBox.right = !datepicker.monthSelectBox.right"
                                                >
                                                    <input
                                                        :value="`${datepicker.defaultMonth.right}월`"
                                                        type="text"
                                                        readonly
                                                    >
                                                    <a
                                                        href="#"
                                                        class="icon"
                                                    ></a>
                                                </div>
                                                <div
                                                    class="select-items"
                                                >
                                                    <ul>
                                                        <li
                                                            v-for="i in 12"
                                                            v-bind:key="i"
                                                        >
                                                            <a
                                                                href="#"
                                                                v-on:click="datepicker.monthSelectBox.right = false;
                                                                            datepicker.defaultMonth.right = fillZero(2,String(i));
                                                                            drawACalendar('right')"
                                                            >{{ fillZero(2, String(i)) }}월</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="input-box">
                                                <div
                                                    class="select-input"
                                                    :class="{ open : datepicker.yearSelectBox.right }"
                                                    v-on:blur="datepicker.yearSelectBox.right = false"
                                                    v-on:click="datepicker.yearSelectBox.right = !datepicker.yearSelectBox.right"
                                                >
                                                    <input
                                                        :value="`${datepicker.defaultYear.right}년`"
                                                        type="text"
                                                        readonly
                                                    >
                                                    <a
                                                        href="#"
                                                        class="icon"
                                                    ></a>
                                                </div>
                                                <div
                                                    class="select-items"
                                                >
                                                    <ul>
                                                        <li
                                                            v-for="y in importYear"
                                                            v-bind:key="y"
                                                        >
                                                            <a
                                                                href="#"
                                                                v-on:click="datepicker.yearSelectBox.right = false;
                                                                            datepicker.defaultYear.right = `${y}`;
                                                                            drawACalendar('right')"
                                                            >{{ y }}년</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                    <th
                                        class="next"
                                        @click="arrowDateChange('right' , 1 , 'right')"
                                    >
                                        <i class="fas fa-caret-right"></i>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>일</th>
                                    <th>월</th>
                                    <th>화</th>
                                    <th>수</th>
                                    <th>목</th>
                                    <th>금</th>
                                    <th>토</th>
                                </tr>
                                <tr
                                    v-for="dateObjects in datepicker.date.right"
                                    :key="dateObjects.week"
                                >
                                    <td
                                        v-for="dateObject in dateObjects.days"
                                        :key="dateObject.date"
                                        :class="dateObject.class()"
                                        @click="setDateRangePicker(dateObject.date)"
                                    >{{ getDateOfDay(dateObject.date) }}
                                    </td>

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
    import { hook }                                                                                                                      from "@/js/common/globalHook";
    import { reactive, computed, onMounted, defineProps, ref, nextTick, watch, onUnmounted, onDeactivated, onBeforeUnmount } from "vue";
    import calendarCalculator                                                                                                            from "@/components/form/calendar/calendarCalculator";
    import { state }                                                                                                                     from "@/components/form/calendar/calendarCalculator";

    const props = defineProps({
        date  : {
            type        : Object,
            default     : () => {
                return {
                    startDate : $moment().format("YYYY-MM-DD"),
                    endDate   : $moment().format("YYYY-MM-DD"),
                };
            },
            description : "현재 선택된 날짜 의 값",
        },
        range : {
            type        : Boolean,
            default     : false,
            description : "달력 범위 선택 여부",
        },
        placeholder : {
            type : String,
            default : () => {
                return "날짜를 선택해주세요."
            }
        }
    });

    const emit = defineEmits(["update:date"]);

    const calendar = ref(null);

    const datepicker = reactive({
        arrowRight       : false,
        date             : { left : [], right : [] },
        calendar         : false,
        yearSelectBox    : { left : false, right : false },
        monthSelectBox   : { left : false, right : false },
        defaultYear      : { left : $moment().format("YYYY"), right : $moment().add(1, "months").format("YYYY") },
        defaultMonth     : { left : $moment().format("MM"), right : $moment().add(1, "months").format("MM") },
        defaultDay       : { left : $moment().format("DD"), right : $moment().add(1, "months").format("DD") },
        selectedDate     : computed(() => props.date),
        range            : computed(() => props.range),
        selectedDateText : computed(() => !datepicker.range ? datepicker.selectedDate.startDate : `${datepicker.selectedDate.startDate} ~ ${datepicker.selectedDate.endDate}`),
    });

    const resizeCalendar = (event) => {
        nextTick(() => {
            if (event.target.getBoundingClientRect().left + calendar.value.getBoundingClientRect().width > window.innerWidth) {
                datepicker.arrowRight = true;
            }
        });
    };

    const {
        fillZero,
        importYear,
        getDateOfDay,
        drawACalendar,
        setDatepicker,
        arrowDateChange,
        setDateRangePicker,
    } = calendarCalculator(datepicker, emit, state);

    onMounted(() => {
        drawACalendar();
        hook().ignoreClass(["datepicker-input", "calendars"])
            .use("clickHook")
            .then((newVal, oldVal) => {
                state.open = false;
            });
    });

    watch(() => datepicker.calendar, (newVal) => {
        if (newVal) {
            state.open = newVal;
        }
    });

    watch(() => state.open, (newVal) => {
        if (!newVal) {
            datepicker.calendar = false;
        }
    }, {
        immediate : true,
    });

</script>

<style scoped>
</style>
