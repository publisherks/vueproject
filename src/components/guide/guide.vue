<template>
    <div class="title-box mb-30">
        <h2 class="main-title">-Titles</h2>
    </div>
    <div class="title-box">
        <h2 class="main-title">Main Title</h2>
    </div>
    <div class="title-box">
        <h3 class="modal-title">Modal Popup Title</h3>
    </div>
    <div class="title-box">
        <h3 class="sub-title">Sub Title</h3>
    </div>
    <div class="title-box">
        <p class="input-title">Input Title</p>
    </div>
    <div class="title-box">
        <h3 class="sub-text">Sub Text</h3>
    </div>
    <div class="title-box mb-30">
        <h2 class="main-title">-Title Box</h2>
    </div>
    <div class="title-box mb-30">
        <h2 class="main-title">Main Title</h2>
        <btn-group 
            class="ml-auto"
        >
            <btn
                text="등록"
                kind="main"
                iconCls="far fa-sign-in"
            />
            <btn
                text="검색"
                kind="sub2"
                iconCls="fal fa-search"
                class="ml-15"
            />
            <btn
                text="엑셀 다운로드"
                kind="sub1"
                iconCls="far fa-download"
                class="ml-15"
            />
        </btn-group>
    </div>

    <div class="title-box mb-30">
        <h2 class="main-title">Main Title, 타이틀 옆 버튼</h2>
        <btn-group 
            class="ml-15"
        >
            <btn
                text="등록"
                kind="main"
                iconCls="far fa-sign-in"
            />
            <btn
                text="검색"
                kind="sub2"
                iconCls="fal fa-search"
                class="ml-15"
            />
            <btn
                text="엑셀 다운로드"
                kind="sub1"
                iconCls="far fa-download"
                class="ml-15"
            />
        </btn-group>
    </div>

    <div class="title-box mb-30">
        <h2 class="main-title">Main Title, 타이틀 옆, 우측 끝 버튼</h2>
        <btn-group 
            class="ml-15"
        >
            <btn
                text="등록"
                kind="main"
                iconCls="far fa-sign-in"
            />
            <btn
                text="검색"
                kind="sub2"
                iconCls="fal fa-search"
                class="ml-15"
            />
            <btn
                text="엑셀 다운로드"
                kind="sub1"
                iconCls="far fa-download"
                class="ml-15"
            />
        </btn-group>
        <btn-group 
            class="ml-auto"
        >
            <btn
                text="등록"
                kind="main"
                iconCls="far fa-sign-in"
            />
            <btn
                text="검색"
                kind="sub2"
                iconCls="fal fa-search"
                class="ml-15"
            />
            <btn
                text="엑셀 다운로드"
                kind="sub1"
                iconCls="far fa-download"
                class="ml-15"
            />
        </btn-group>
    </div>

    <div class="title-box mb-30">
        <h2 class="main-title">-Buttons Components</h2>
    </div>

    <v-container class="mb-30">
        <v-row cols="1">
            <v-col class="flex-aro">
                <btn
                    text="Main Button"
                    kind="main"
                    iconCls="far fa-sign-in"
                />
                <btn
                    text="Sub1 Button"
                    kind="sub1"
                    iconCls="far fa-sign-in"
                />
                <btn
                    text="Sub2 Button"
                    kind="sub2"
                    iconCls="far fa-sign-in"
                />
                <btn
                    text="Cancel Button"
                    kind="cancel"
                    iconCls="far fa-sign-in"
                />
                <btn
                    text="Delete Button"
                    kind="delete"
                    iconCls="far fa-sign-in"
                />
            </v-col>
        </v-row>
        <v-row cols="1" class="mt-20">
            <v-col class="flex-aro">
                <btn
                    text="Main Button"
                    kind="main"
                    iconCls="far fa-sign-in"
                    disabled
                />
                <btn
                    text="Sub1 Button"
                    kind="sub1"
                    iconCls="far fa-sign-in"
                    disabled
                />
                <btn
                    text="Sub2 Button"
                    kind="sub2"
                    iconCls="far fa-sign-in"
                    disabled
                />
                <btn
                    text="Cancel Button"
                    kind="cancel"
                    iconCls="far fa-sign-in"
                    disabled
                />
                <btn
                    text="Delete Button"
                    kind="delete"
                    iconCls="far fa-sign-in"
                    disabled
                />
            </v-col>
        </v-row>
        <v-row cols="1" class="mt-20">
            <v-col class="flex-aro">
                <btn
                    text="Table Button Main"
                    kind="main"
                    iconCls="far fa-sign-in"
                    size="small"
                />
                <btn
                    text="Table Button Sub1"
                    kind="sub1"
                    iconCls="far fa-sign-in"
                    size="small"
                />
                <btn
                    text="Table Button Sub2"
                    kind="sub2"
                    iconCls="far fa-sign-in"
                    size="small"
                />
                <btn
                    text="Table Button Cancel"
                    kind="cancel"
                    iconCls="far fa-sign-in"
                    size="small"
                />
                <btn
                    text="Table Button Delete"
                    kind="delete"
                    iconCls="far fa-sign-in"
                    size="small"
                />
            </v-col>
        </v-row>
    </v-container>
    <div class="title-box mb-30">
        <h2 class="main-title">-Button Icons</h2>
    </div>

    <v-container class="mb-30">
        <v-row cols="1">
            <v-col class="flex-aro">
                <btn
                    text="수정"
                    kind="sub1"
                    iconCls="fal fa-edit"
                />
                <btn
                    text="삭제"
                    kind="delete"
                    iconCls="far fa-trash-alt"
                />
                <btn
                    text="등록"
                    kind="main"
                    iconCls="far fa-sign-in"
                />
                <btn
                    text="취소"
                    kind="cancel"
                    iconCls="fal fa-times"
                />
                <btn
                    text="확인"
                    kind="main"
                    iconCls="fal fa-check"
                />
                <btn
                    text="결제"
                    kind="sub2"
                    iconCls="far fa-coins"
                />
                <btn
                    text="다운로드"
                    kind="main"
                    iconCls="far fa-download"
                />
                <btn
                    text="복구"
                    kind="sub1"
                    iconCls="far fa-undo"
                />
                <btn
                    text="목록으로"
                    kind="cancel"
                    iconCls="far fa-long-arrow-left"
                />
            </v-col>
        </v-row>
    </v-container>

    <div class="title-box mb-30">
        <h2 class="main-title">-Grid Layout Components</h2>
    </div>

    <v-container class="mb-30 bg">
        <v-row>
            <v-col cols="1">col-1</v-col>
            <v-col cols="11">col-11</v-col>
        </v-row>
        <v-row>
            <v-col cols="2">col-2</v-col>
            <v-col cols="10">col-10</v-col>
        </v-row>
        <v-row>
            <v-col cols="3">col-3</v-col>
            <v-col cols="9">col-9</v-col>
        </v-row>
        <v-row>
            <v-col cols="4">col-4</v-col>
            <v-col cols="8">col-8</v-col>
        </v-row>
        <v-row>
            <v-col cols="5">col-5</v-col>
            <v-col cols="7">col-7</v-col>
        </v-row>
        <v-row>
            <v-col cols="6">col-6</v-col>
            <v-col cols="6">col-6</v-col>
        </v-row>
    </v-container>

    <v-container class="mb-30 bg">
        <v-row cols="1">
            <v-col>col 1개, col width 자동 계산</v-col>
        </v-row>
        <v-row cols="2">
            <v-col
                v-for="i in 2"
                v-bind:key="i"
            >col 2개, col width 자동 계산</v-col>
        </v-row>
        <v-row cols="2">
            <v-col
                v-for="i in 2"
                v-bind:key="i"
            >col 2개, col width 자동 계산</v-col>
        </v-row>
        <v-row cols="3">
            <v-col
                v-for="i in 3"
                v-bind:key="i"
            >col 3개, col width 자동 계산</v-col>
        </v-row>
        <v-row cols="4">
            <v-col
                v-for="i in 4"
                v-bind:key="i"
            >col 4개, col width 자동 계산</v-col>
        </v-row>
        <v-row cols="5">
            <v-col
                v-for="i in 5"
                v-bind:key="i"
            >col 5개, col width 자동 계산</v-col>
        </v-row>
        <v-row cols="6">
            <v-col
                v-for="i in 6"
                v-bind:key="i"
            >col 6개, col width 자동 계산</v-col>
        </v-row>
        <v-row cols="7">
            <v-col
                v-for="i in 7"
                v-bind:key="i"
            >col 7개, col width 자동 계산</v-col>
        </v-row>
        <v-row cols="8">
            <v-col
                v-for="i in 8"
                v-bind:key="i"
            >col 8개, col width 자동 계산</v-col>
        </v-row>
        <v-row cols="9">
            <v-col
                v-for="i in 9"
                v-bind:key="i"
            >col 9개, col width 자동 계산</v-col>
        </v-row>
        <v-row cols="10">
            <v-col
                v-for="i in 10"
                v-bind:key="i"
            >col 10개, col width 자동 계산</v-col>
        </v-row>
        <v-row cols="11">
            <v-col
                v-for="i in 11"
                v-bind:key="i"
            >col 11개, col width 자동 계산</v-col>
        </v-row>
        <v-row cols="12">
            <v-col
                v-for="i in 12"
                v-bind:key="i"
            >col 12개, col width 자동 계산</v-col>
        </v-row>
    </v-container>

    <div class="title-box mb-30">
        <h2 class="main-title">-Table Layout Components</h2>
    </div>

    <v-table
        class="mb-30"
        type="row"
        :column="setup.table2.column"
        :datas="setup.table2.datas"
        :width="setup.table2.width"
        :columnCount="setup.table2.columnCount"
    />

    <btn-group
        align="right"
        class="mb-30"
    >
        <btn
            text="취소"
            kind="cancel"
            iconCls="fal fa-times"
        />
        <btn
            text="등록"
            kind="main"
            iconCls="fal fa-check"
            class="ml-15"
        />
    </btn-group>

    <v-table
        class="mb-30"
        type="col"
        :column="setup.table1.column"
        :datas="setup.table1.datas"
    />

    <div class="title-box mb-30">
        <h2 class="main-title">-Input & Check, Radio Button Components</h2>
    </div>

    <v-container>
        <v-row cols="3">
            <v-col>
                <v-input 
                    placeholder="placeholder"
                    type="text"
                    disabled
                    v-model:value="setup.inputData1"
                />

                <div class="mt-10"></div>
                
                <v-input 
                    placeholder="placeholder"
                    type="text"
                    v-model:value="setup.inputData2"
                />

                <div class="mt-10"></div>
                
                <v-input
                    class="invalid"
                    placeholder="placeholder"
                    type="text"
                    v-model:value="setup.inputData3"
                />

                <div class="mt-10"></div>
                
                <v-input
                    class="pull"
                    placeholder="placeholder"
                    type="text"
                    v-model:value="setup.inputData4"
                />
            </v-col>
            <v-col>
                <v-input
                    class="search"
                    placeholder="검색"
                    type="text"
                    iconType="icon"
                    v-model:value="setup.inputData5"
                />

                <div class="mt-10"></div>

                <v-select
                    :datas="setOption"
                    v-model:value="setup.selectData"
                />

                <div class="mt-10"></div>

                <v-calendar
                    v-model:value="setup.calendar"
                    :range="true"
                />

                <div class="mt-10"></div>

                <v-textarea
                    placeholder="입력해주세요."
                />
            </v-col>
            <v-col>
                <div>
                    <v-check
                        label="CheckBox"
                        class="mr-10"
                    />

                    <v-check
                        label="CheckBox"
                        class="mr-10"
                        disabled
                    />

                    <v-check
                        label="CheckBox"
                        required
                    />
                </div>

                <div class="mt-10"></div>

                <div>
                    <v-radio
                        label="Radio Button"
                        name="radio"
                        value="1"
                        class="mr-10"
                    />
                    
                    <v-radio
                        label="Radio Button"
                        name="radio"
                        value="2"
                        class="mr-10"
                    />

                    <v-radio
                        label="Radio Button"
                        name="radio"
                        value="3"
                        class="mr-10"
                        disabled
                    />

                    <v-radio
                        label="Radio Button"
                        name="radio"
                        value="4"
                        class="mr-10"
                        required
                    />
                </div>

                <div class="mt-10"></div>

                <v-quantity />
            </v-col>
        </v-row>
    </v-container>
    
</template>
<script setup>
    import { onMounted, reactive } from "vue";

    const setup = reactive({
        table1: {
            column: {
                field1 : {
                    align: "center",
                    label: "No.",
                    width: "60px"
                },
                field2 : {
                    align: "left",
                    label: "항목1",
                },
                field3 : {
                    align: "center",
                    label: "항목2",
                },
                field4 : {
                    align: "center",
                    label: "항목3",
                },
                field5 : {
                    align: "right",
                    label: "항목4",
                },
                field6 : {
                    align: "right",
                    label: "항목5",
                },
                field7 : {
                    align: "center",
                    label: "항목6",
                    type: "input",
                    placeholder : "항목6을 입력해주세요.",
                },
                field8 : {
                    align: "center",
                    label: "항목7",
                    type: "select",
                    option : {}
                },
                field9 : {
                    align: "center",
                    label: "항목8",
                    width: "14%",
                    type: "button",
                    children: [
                        {
                            kind : "main",
                            text : "다운로드",
                            icon : "far fa-sign-in",
                            fn : download
                        },
                        {
                            kind : "sub1",
                            text : "다운로드",
                            icon : "far fa-sign-in",
                            fn : download
                        }
                    ],
                },
            },
            datas: [
                {
                    field1: "1",
                    field2: "사용자 입력 값 입니다. 사용자 입력 값 입니다.",
                    field3: "항목3",
                    field4: "항목4",
                    field5: "400,000 원",
                    field6: "400,000 원",
                    field7: "",
                    field8: "",
                },
                {
                    field1: "2",
                    field2: "사용자 입력 값 입니다. 사용자 입력 값 입니다.",
                    field3: "항목3",
                    field4: "항목4",
                    field5: "400,000 원",
                    field6: "400,000 원",
                    field7: "",
                    field8: "",
                }
            ],
        },
        table2: {
            column: {
                field1 : {
                    align: "left",
                    label: "품목",
                    type: "select",
                    option : {},
                    required : true,
                },
                field2 : {
                    align: "left",
                    label: "품목코드",
                    placeholder: "품목코드를 입력하세요.",
                    type: "input",
                },
                field3 : {
                    align: "left",
                    label: "거래처",
                    type: "input",
                    placeholder: "거래처를 입력하세요.",
                },
                field4 : {
                    align: "left",
                    label: "발주량",
                    type: "input",
                    placeholder: "발주량을 입력하세요.",
                    required : true,
                },
                field5 : {
                    align: "left",
                    label: "단위",
                    requiredText : true,
                },
                field6 : {
                    align: "left",
                    label: "납기 예정일",
                    type: "calendar",
                    required : true,
                },
                field7 : {
                    align: "left",
                    label: "비고",
                    type: "textarea",
                    placeholder: "비고를 입력하세요.",
                    colspan: "5",
                }
            },
            datas: {
                field1 : "",
                field2 : "",
                field3 : "",
                field4 : "",
                field5 : "테스트",
                field6 : undefined,
                field7 : "",
            },
            width: {
                title: "10%",
                content: "23.3%",
            },
            columnCount: 3
        },
        calendar: undefined,
        selectOpen1: false,
        selectOpen2: false,
        monthOpen: false,
        yearOpen: false,
        datepicker: false,
        modal: false,
        selectDatas: [
            {
                text: "selectOption1",
                value: 1
            },
            {
                text: "selectOption2",
                value: 2
            },
            {
                text: "selectOption3",
                value: 3
            },
            {
                text: "selectOption4",
                value: 4
            },
            {
                text: "selectOption5",
                value: 5
            }
        ],
        selectData: "",
        inputData: "",
        inputData1: "",
        inputData2: "",
        inputData3: "",
        inputData4: "",
        inputData5: "",
    });

    setup.table1.column.field8.option = setup.selectDatas;
    setup.table2.column.field1.option = setup.selectDatas;
    
    function download(event) {
        alert('다운로드 이벤트')
    }

    const postsList = async(request) => {
        return await $api.get("/posts", request).catch(e => { console.error(e);});
    }

    onMounted(() => {
        postsLists();

    })

    const postsLists = async() => {
        const response = await postsList();

        console.log(response);
    }
</script>
<style scoped lang="scss">
.bg > [class^="row"] > [class^="col"] {
    padding: 10px;
    border: 1px solid var(--border-color);
    background-color: var(--content-bg-color);
}
</style>