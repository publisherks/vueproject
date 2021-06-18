import { computed, nextTick, reactive } from "vue";

export const state = reactive({
    open : false,
});

export default function calendarCalculator (datepicker, emit, state) {

    const importYear = computed(() => {
        const currentYear = Number($moment().format("YYYY"));
        const futureYear  = Number($moment().add(10, "years").format("YYYY"));
        return Array(futureYear - currentYear).fill().map((_, i) => currentYear + i);
    });

    const weekDays = (year, month, direction) => {
        const endDate = $moment().date(0).month(month - 1).year(year);
        return Array(endDate.date()).fill(0).map((key, i) => $moment().date(i + 1).month(month - 1).year(year))
            .map((day) => ({ day, week : day.week() }))
            .filter(({ week }, i, arr) => arr.findIndex((info) => info.week === week) === i)
            .map(({ day, week }) => ({
                week, days : Array(7).fill(0).map((key, i) => {
                    const date = $moment(day).week(week).startOf("week").add(i, "day");
                    return {
                        class : () => {
                            if (date.format("YYYYMMDD") === ($moment(datepicker.selectedDate.startDate).format("YYYYMMDD"))) {
                                return "start-date";
                            } else if (date.format("YYYYMMDD") === ($moment(datepicker.selectedDate.endDate).format("YYYYMMDD"))) {
                                return "end-date";
                            } else if ((date.format("YYYYMMDD") >= ($moment(datepicker.selectedDate.startDate).format("YYYYMMDD")) && (date.format("YYYYMMDD") <=
                                                                                                                                       ($moment(datepicker.selectedDate.endDate)
                                                                                                                                           .format("YYYYMMDD"))))
                                       && datepicker.selectedDate.endDate) {
                                return "in-range";
                            } else if (date.format("YYYYMM") < datepicker.defaultYear[direction] + datepicker.defaultMonth[direction]) {
                                return "prev-month";
                            } else if (date.format("YYYYMM") > datepicker.defaultYear[direction] + datepicker.defaultMonth[direction]) {
                                return "next-month";
                            }
                        },
                        date  : date.format("YYYY-MM-DD"),
                    };
                }),
            }));
    };

    const fillZero = (width, str) => {
        return String(str).length >= width ? str : new Array(width - String(str).length + 1).join("0") + String(str);
    };

    const convertToNumbersUnconditionally = (data) => Number(data);

    const convertToStringsUnconditionally = (data) => String(data);

    const drawACalendar = (direction) => {
        followTheDate(direction);
        datepicker.date["left"]  = weekDays(datepicker.defaultYear["left"], datepicker.defaultMonth["left"], "left");
        datepicker.date["right"] = weekDays(datepicker.defaultYear["right"], datepicker.defaultMonth["right"], "right");
    };

    const setDatepicker = (key, boolean) => {
        if (state.open) {
            state.open = false;
        }
        nextTick(() => {
            datepicker[key] = boolean;
        });
        drawACalendar();
    };

    const setDateRangePicker = (date) => {
        if (!datepicker.range) {
            datepicker.selectedDate.startDate = date;
            datepicker.selectedDate.endDate   = date;
            datepicker.calendar               = false;
        } else if (datepicker.selectedDate.startDate && datepicker.selectedDate.endDate) {
            datepicker.selectedDate.startDate = date;
            datepicker.selectedDate.endDate   = "";
        } else if (datepicker.selectedDate.startDate === date) {
            datepicker.selectedDate.startDate = date;
            datepicker.selectedDate.endDate   = date;
            datepicker.calendar             = false;
        } else if ($moment(datepicker.selectedDate.startDate).isAfter(date)) {
            datepicker.selectedDate.startDate = date;
            datepicker.selectedDate.endDate   = "";
        } else if (!$moment(datepicker.selectedDate.startDate).isAfter(date)) {
            datepicker.selectedDate.endDate = date;
            datepicker.calendar             = false;
        }
        emit("update:date", datepicker.selectedDate);
    };

    const followTheDate = (direction) => {
        switch (direction) {
        case "left":
            datepicker.defaultYear["right"]  = $moment(datepicker.defaultYear["left"] + datepicker.defaultMonth["left"]).add(1, "months").format("YYYY");
            datepicker.defaultMonth["right"] = $moment(datepicker.defaultYear["left"] + datepicker.defaultMonth["left"]).add(1, "months").format("MM");
            break;
        case "right":
            datepicker.defaultYear["left"]  = $moment(datepicker.defaultYear["right"] + datepicker.defaultMonth["right"]).add(-1, "months").format("YYYY");
            datepicker.defaultMonth["left"] = $moment(datepicker.defaultYear["right"] + datepicker.defaultMonth["right"]).add(-1, "months").format("MM");
            break;
        }
    };

    const arrowDateChange = (type = "", numberOfMovingMonth = 1, direction) => {
        switch (type) {
        case "left":
            datepicker.defaultMonth[direction] = convertToStringsUnconditionally(fillZero(2, Number(datepicker.defaultMonth[direction]) - numberOfMovingMonth));
            break;
        case "right":
            datepicker.defaultMonth[direction] = convertToStringsUnconditionally(fillZero(2, Number(datepicker.defaultMonth[direction]) + numberOfMovingMonth));
            break;
        }
        overMonthMovementCheck(direction);
    };

    const overMonthMovementCheck = (direction) => {
        if (datepicker.defaultMonth[direction] === "00") {
            datepicker.defaultMonth[direction] = "12";
            datepicker.defaultYear[direction]  = convertToStringsUnconditionally(Number(datepicker.defaultYear[direction]) - 1);
        } else if (datepicker.defaultMonth[direction] === "13") {
            datepicker.defaultMonth[direction] = "01";
            datepicker.defaultYear[direction]  = convertToStringsUnconditionally(Number(datepicker.defaultYear[direction]) + 1);
        }
        drawACalendar(direction);
    };

    const getDateOfDay = (date) => {
        return $moment(date).format("DD");
    };

    return {
        weekDays,
        fillZero,
        importYear,
        getDateOfDay,
        drawACalendar,
        setDatepicker,
        followTheDate,
        arrowDateChange,
        setDateRangePicker,
        convertToNumbersUnconditionally,
        convertToStringsUnconditionally,
    };
}
