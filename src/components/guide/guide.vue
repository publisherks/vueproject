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
        <btn-container 
            align="right"
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
        </btn-container>
    </div>

    <div class="title-box mb-30">
        <h2 class="main-title">Main Title, 타이틀 옆 버튼</h2>
        <btn-container 
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
        </btn-container>
    </div>

    <div class="title-box mb-30">
        <h2 class="main-title">Main Title, 타이틀 옆, 우측 끝 버튼</h2>
        <btn-container 
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
        </btn-container>
        <btn-container 
            align="right"
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
        </btn-container>
    </div>

    <div class="title-box mb-30">
        <h2 class="main-title">-Buttons</h2>
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
        <h2 class="main-title">-Grid Layout</h2>
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
        <h2 class="main-title">-Table Layout</h2>
    </div>

    <div class="tb-container left-th mb-30">
        <table>
            <colgroup>
                <col width="10%">
                <col width="23.3%">
                <col width="10%">
                <col width="23.4%">
                <col width="10%">
                <col width="23.3%">
            </colgroup>
            <tbody>
                <tr>
                    <th class="required">품목</th>
                    <td>
                        <div class="input-box pull">
                            <div
                                class="select-input"
                                :class="{ open : selectOpen1 }"
                                v-on:blur="selectOpen1 = false"
                                v-on:click="selectOpen1 = !selectOpen1"
                            >
                                <input
                                    type="text"
                                    placeholder="품목을 선택해주세요."
                                >
                                <a
                                    href="#"
                                    class="icon"
                                ></a>
                            </div>
                            <div class="select-items">
                                <ul>
                                    <li
                                        v-for="i in 5"
                                        v-bind:key="i"
                                    >
                                        <a
                                            href="#"
                                            v-on:click="setup.selectOpen1 = false"
                                        >메뉴{{ i }}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </td>
                    <th>품목코드</th>
                    <td>
                        <div class="input-box pull">
                            <input
                                type="text"
                                placeholder="코드를 입력하세요."
                            >
                            <a
                                href="#"
                                class="del"
                            ></a>
                        </div>
                    </td>
                    <th>거래처</th>
                    <td>
                        <div class="input-box pull">
                            <input
                                type="text"
                                placeholder="거래처명을 입력하세요."
                            >
                            <a
                                href="#"
                                class="del"
                            ></a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th class="required">발주량</th>
                    <td>
                        <div class="input-box pull">
                            <input
                                type="text"
                                placeholder="발주량 숫자로만 입력하세요."
                            >
                            <a
                                href="#"
                                class="del"
                            ></a>
                        </div>
                    </td>
                    <th class="required-text">단위</th>
                    <td>
                        테스트
                    </td>
                    <th class="required">납기 예정일</th>
                    <td>
                        <div class="input-box pull">
                            <input
                                type="text"
                                placeholder="날짜를 입력하세요."
                            >
                            <a
                                href="#"
                                class="del"
                            ></a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>비고</th>
                    <td colspan="5">
                        <div class="text-area pull">
                            <textarea
                                name=""
                                id=""
                            ></textarea>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="btn-box align-right mb-30">
        <button
            type="button"
            class="btn btn-cancel"
        >
            <i class="fal fa-times"></i>취소
        </button>
        <button
            type="button"
            class="btn btn-main ml-15"
        >
            <i class="fal fa-check"></i>등록
        </button>
    </div>

    <div class="tb-container mb-30">
        <table>
            <colgroup>
                <col width="60px">
                <col width="">
                <col width="">
                <col width="">
                <col width="">
                <col width="">
                <col width="">
                <col width="">
                <col width="14%">
            </colgroup>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>항목 1</th>
                    <th>항목 2</th>
                    <th>항목 3</th>
                    <th>항목 4</th>
                    <th>항목 5</th>
                    <th>항목 6</th>
                    <th>항목 7</th>
                    <th>항목 8</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>항목 1</td>
                    <td>항목 2</td>
                    <td>항목 3</td>
                    <td>항목 4</td>
                    <td>항목 5</td>
                    <td>항목 6</td>
                    <td>항목 7</td>
                    <td>
                        <button
                            type="button"
                            class="btn-tb btn-main"
                        >
                            <i class="far fa-sign-in"></i>다운로드
                        </button>
                        <button
                            type="button"
                            class="btn-tb btn-sub1 ml-10"
                        >
                            <i class="far fa-sign-in"></i>다운로드
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td class="align-l">사용자 입력 값 입니다. 사용자 입력 값 입니다.</td>
                    <td>항목 2</td>
                    <td>항목 3</td>
                    <td class="align-r">400,000 원</td>
                    <td class="align-r">400,000 원</td>
                    <td>
                        <div class="input-box">
                            <input
                                type="text"
                                placeholder="placeholder"
                            >
                            <a
                                href="#"
                                class="del"
                            ></a>
                        </div>
                    </td>
                    <td>
                        <div class="input-box">
                            <div
                                class="select-input"
                                :class="{ open : setup.selectOpen2 }"
                                v-on:blur="setup.selectOpen2 = false"
                                v-on:click="setup.selectOpen2 = !setup.selectOpen2"
                            >
                                <input
                                    type="text"
                                    placeholder="검색"
                                >
                                <a
                                    href="#"
                                    class="icon"
                                ></a>
                            </div>
                            <div class="select-items">
                                <ul>
                                    <li
                                        v-for="i in 5"
                                        v-bind:key="i"
                                    >
                                        <a
                                            href="#"
                                            v-on:click="selectOpen2 = false"
                                        >메뉴{{ i }}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </td>
                    <td>
                        <button
                            type="button"
                            class="btn-tb btn-main"
                        >
                            <i class="far fa-sign-in"></i>다운로드
                        </button>
                        <button
                            type="button"
                            class="btn-tb btn-sub1 ml-10"
                        >
                            <i class="far fa-sign-in"></i>다운로드
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="tb-container mb-30">
        <table>
            <colgroup>
                <col width="60px">
                <col width="">
                <col width="">
                <col width="">
                <col width="">
                <col width="">
                <col width="">
                <col width="">
                <col width="">
                <col width="">
                <col width="140px">
            </colgroup>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>계약자(상호명)</th>
                    <th>구역</th>
                    <th>주문일자</th>
                    <th>배송지</th>
                    <th>주문금액</th>
                    <th>누적매출금액</th>
                    <th>결제현황</th>
                    <th>미수금</th>
                    <th>주문확인</th>
                    <th>상태</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>감상흠(우민)</td>
                    <td>서초</td>
                    <td>2020. 10. 05 / 12:10:11</td>
                    <td>안산창고</td>
                    <td class="align-r">400,000 원</td>
                    <td class="align-r">400,000 원</td>
                    <td>미결제</td>
                    <td>0</td>
                    <td>미확인</td>
                    <td class="states-box enough">만족</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>감상흠(우민)</td>
                    <td>서초</td>
                    <td>2020. 10. 05 / 12:10:11</td>
                    <td>안산창고</td>
                    <td class="align-r">400,000 원</td>
                    <td class="align-r">400,000 원</td>
                    <td>미결제</td>
                    <td>0</td>
                    <td>미확인</td>
                    <td class="states-box shortage">부족</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>감상흠(우민)</td>
                    <td>서초</td>
                    <td>2020. 10. 05 / 12:10:11</td>
                    <td>안산창고</td>
                    <td class="align-r">400,000 원</td>
                    <td class="align-r">400,000 원</td>
                    <td>미결제</td>
                    <td>0</td>
                    <td>미확인</td>
                    <td class="states-box slated">입고예정</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="tb-container mb-30">
        <table>
            <colgroup>
                <col width="60px">
                <col width="">
                <col width="">
                <col width="">
                <col width="">
                <col width="">
                <col width="">
                <col width="">
                <col width="">
                <col width="">
                <col width="120px">
                <col width="">
                <col width="">
                <col width="140px">
            </colgroup>
            <thead>
                <tr>
                    <th>구분</th>
                    <th>출하번호</th>
                    <th>바코드 번호</th>
                    <th>주문번호</th>
                    <th>계약자(상호명)</th>
                    <th>구역</th>
                    <th>배송지</th>
                    <th>품목</th>
                    <th>수량</th>
                    <th>단위</th>
                    <th>재고상태</th>
                    <th>출하등록일</th>
                    <th>출하요청일</th>
                    <th>출하확정</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>일반</td>
                    <td>OUT201029-0001</td>
                    <td>ㅡ</td>
                    <td>201026-0010</td>
                    <td>감상흠(우민)</td>
                    <td>서초</td>
                    <td>안산창고</td>
                    <td>가랏엿 (가대)</td>
                    <td>30</td>
                    <td>BOX</td>
                    <td class="states-box enough">50 BOX / 만족</td>
                    <td>2020.10.05 12:10:11</td>
                    <td>ㅡ</td>
                    <td class="states-box undecided">미확정</td>
                </tr>
                <tr>
                    <td>일반</td>
                    <td>OUT201029-0001</td>
                    <td>ㅡ</td>
                    <td>201026-0010</td>
                    <td>감상흠(우민)</td>
                    <td>서초</td>
                    <td>안산창고</td>
                    <td>가랏엿 (가대)</td>
                    <td>30</td>
                    <td>BOX</td>
                    <td class="states-box shortage">50 BOX / 부족</td>
                    <td>2020.10.05 12:10:11</td>
                    <td>ㅡ</td>
                    <td class="states-box confirmation">확정</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="title-box mb-30">
        <h2 class="main-title">-Paging Layout</h2>
    </div>

    <div class="paging-container">
        <div class="paging-box">
            <a
                href="#"
                class="prev"
            ></a>
            <a
                href="#"
                v-for="i in 10"
                v-bind:key="i"
                v-bind:class="{ 'on' : i === 1}"
            >{{ i }}</a>
            <a
                href="#"
                class="next"
            ></a>
        </div>
    </div>

    <div class="title-box mb-30">
        <h2 class="main-title">-Input & Check, Radio Button</h2>
    </div>

    <div class="container mb-30">
        <div class="row-cols-3">
            <div class="col">

                <div class="input-box disabled">
                    <input
                        type="text"
                        placeholder="placeholder"
                        disabled
                    >
                    <a
                        href="#"
                        class="del"
                    ></a>
                </div>

                <div class="mt-10"></div>

                <div class="input-box">
                    <input
                        type="text"
                        placeholder="placeholder"
                    >
                    <a
                        href="#"
                        class="del"
                    ></a>
                </div>

                <div class="mt-10"></div>

                <div class="input-box invalid">
                    <input
                        type="text"
                        placeholder="placeholder"
                    >
                    <a
                        href="#"
                        class="del"
                    ></a>
                </div>

                <div class="mt-10"></div>

                <div class="input-box pull">
                    <input
                        type="text"
                        placeholder="placeholder"
                    >
                    <a
                        href="#"
                        class="del"
                    ></a>
                </div>

            </div>
            <div class="col">
                <div class="input-box search">
                    <input
                        type="text"
                        placeholder="placeholder"
                    >
                    <a
                        href="#"
                        class="icon"
                    ></a>
                </div>

                <div class="mt-10"></div>

                <div class="input-box">
                    <div
                        class="select-input"
                        :class="{ open : selectOpen2 }"
                        v-on:blur="selectOpen2 = false"
                        v-on:click="selectOpen2 = !selectOpen2"
                    >
                        <input
                            type="text"
                            placeholder="검색"
                        >
                        <a
                            href="#"
                            class="icon"
                        ></a>
                    </div>
                    <div class="select-items">
                        <ul>
                            <li
                                v-for="i in 5"
                                v-bind:key="i"
                            >
                                <a
                                    href="#"
                                    v-on:click="setup.selectOpen2 = false"
                                >메뉴{{ i }}</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="mt-10"></div>

                <div class="input-box">
                    <div
                        class="datepicker-input"
                        v-on:click="setup.datepicker = !setup.datepicker"
                    >
                        <input
                            type="text"
                            autocomplete="off"
                            placeholder="날짜를 선택해주세요."
                            readonly
                        >
                        <i class="icon"></i>
                    </div>
                    <!-- 달력 한개일 경우 wim-datepicker에 single 클래스 추가 -->
                    <div
                        class="wim-datepicker"
                        :class="{ show : setup.datepicker }"
                    >
                        <div class="calendars">
                            <div class="calendar left">
                                <div class="calendar-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th class="prev">
                                                    <i class="fas fa-caret-left"></i>
                                                </th>
                                                <th colspan="5">
                                                    <div class="flex">
                                                        <div class="input-box">
                                                            <div
                                                                class="select-input"
                                                                :class="{ open : setup.monthOpen }"
                                                                v-on:blur="setup.monthOpen = false"
                                                                v-on:click="setup.monthOpen = !setup.monthOpen"
                                                            >
                                                                <input
                                                                    type="text"
                                                                    value="1월"
                                                                    readonly
                                                                >
                                                                <a
                                                                    href="#"
                                                                    class="icon"
                                                                ></a>
                                                            </div>
                                                            <div class="select-items">
                                                                <ul>
                                                                    <li
                                                                        v-for="i in 12"
                                                                        v-bind:key="i"
                                                                    >
                                                                        <a
                                                                            href="#"
                                                                            v-on:click="setup.monthOpen = false"
                                                                        >{{ i }}월</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div class="input-box">
                                                            <div
                                                                class="select-input"
                                                                :class="{ open : setup.yearOpen }"
                                                                v-on:blur="setup.yearOpen = false"
                                                                v-on:click="setup.yearOpen = !setup.yearOpen"
                                                            >
                                                                <input
                                                                    type="text"
                                                                    value="2020년"
                                                                    readonly
                                                                >
                                                                <a
                                                                    href="#"
                                                                    class="icon"
                                                                ></a>
                                                            </div>
                                                            <div class="select-items">
                                                                <ul>
                                                                    <li
                                                                        v-for="i in 5"
                                                                        v-bind:key="i"
                                                                    >
                                                                        <a
                                                                            href="#"
                                                                            v-on:click="setup.yearOpen = false"
                                                                        >202{{ i }}년</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th class="next">
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
                                            <tr>
                                                <td class="prev-month">29</td>
                                                <td class="prev-month">30</td>
                                                <td>1</td>
                                                <td>2</td>
                                                <td>3</td>
                                                <td>4</td>
                                                <td>5</td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>7</td>
                                                <td>8</td>
                                                <td class="start-date">9</td>
                                                <td class="in-range">10</td>
                                                <td class="in-range">11</td>
                                                <td class="in-range">12</td>
                                            </tr>
                                            <tr>
                                                <td class="in-range">13</td>
                                                <td class="in-range">14</td>
                                                <td class="in-range">15</td>
                                                <td class="in-range">16</td>
                                                <td class="in-range">17</td>
                                                <td class="in-range">18</td>
                                                <td class="in-range">19</td>
                                            </tr>
                                            <tr>
                                                <td class="end-date">20</td>
                                                <td>21</td>
                                                <td>22</td>
                                                <td>23</td>
                                                <td>24</td>
                                                <td>25</td>
                                                <td>26</td>
                                            </tr>
                                            <tr>
                                                <td>27</td>
                                                <td>28</td>
                                                <td>29</td>
                                                <td>30</td>
                                                <td>31</td>
                                                <td class="next-month">1</td>
                                                <td class="next-month">2</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="calendar right">
                                <div class="calendar-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th class="prev">
                                                    <i class="fas fa-caret-left"></i>
                                                </th>
                                                <th colspan="5">
                                                    <div class="flex">
                                                        <div class="input-box">
                                                            <div
                                                                class="select-input"
                                                                :class="{ open : setup.monthOpen }"
                                                                v-on:blur="setup.monthOpen = false"
                                                                v-on:click="setup.monthOpen = !setup.monthOpen"
                                                            >
                                                                <input
                                                                    type="text"
                                                                    value="1월"
                                                                    readonly
                                                                >
                                                                <a
                                                                    href="#"
                                                                    class="icon"
                                                                ></a>
                                                            </div>
                                                            <div class="select-items">
                                                                <ul>
                                                                    <li
                                                                        v-for="i in 12"
                                                                        v-bind:key="i"
                                                                    >
                                                                        <a
                                                                            href="#"
                                                                            v-on:click="setup.monthOpen = false"
                                                                        >{{ i }}월</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div class="input-box">
                                                            <div
                                                                class="select-input"
                                                                :class="{ open : yearOpen }"
                                                                v-on:blur="yearOpen = false"
                                                                v-on:click="yearOpen = !yearOpen"
                                                            >
                                                                <input
                                                                    type="text"
                                                                    value="2020년"
                                                                    readonly
                                                                >
                                                                <a
                                                                    href="#"
                                                                    class="icon"
                                                                ></a>
                                                            </div>
                                                            <div class="select-items">
                                                                <ul>
                                                                    <li
                                                                        v-for="i in 5"
                                                                        v-bind:key="i"
                                                                    >
                                                                        <a
                                                                            href="#"
                                                                            v-on:click="yearOpen = false"
                                                                        >202{{ i }}년</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th class="next">
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
                                            <tr>
                                                <td class="prev-month">29</td>
                                                <td class="prev-month">30</td>
                                                <td>1</td>
                                                <td>2</td>
                                                <td>3</td>
                                                <td>4</td>
                                                <td>5</td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>7</td>
                                                <td>8</td>
                                                <td class="start-date">9</td>
                                                <td class="in-range">10</td>
                                                <td class="in-range">11</td>
                                                <td class="in-range">12</td>
                                            </tr>
                                            <tr>
                                                <td class="in-range">13</td>
                                                <td class="in-range">14</td>
                                                <td class="in-range">15</td>
                                                <td class="in-range">16</td>
                                                <td class="in-range">17</td>
                                                <td class="in-range">18</td>
                                                <td class="in-range">19</td>
                                            </tr>
                                            <tr>
                                                <td class="end-date">20</td>
                                                <td>21</td>
                                                <td>22</td>
                                                <td>23</td>
                                                <td>24</td>
                                                <td>25</td>
                                                <td>26</td>
                                            </tr>
                                            <tr>
                                                <td>27</td>
                                                <td>28</td>
                                                <td>29</td>
                                                <td>30</td>
                                                <td>31</td>
                                                <td class="next-month">1</td>
                                                <td class="next-month">2</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-10"></div>

                <div class="text-area">
                    <textarea
                        name=""
                        id=""
                    ></textarea>
                </div>
            </div>
            <div class="col">
                <div>
                    <div class="check-box mr-10">
                        <label>
                            <input type="checkbox">
                            <i class="icon"></i> CheckBox
                        </label>
                    </div>

                    <div class="check-box disable mr-10">
                        <label>
                            <input
                                type="checkbox"
                                disabled
                            >
                            <i class="icon"></i> CheckBox
                        </label>
                    </div>

                    <div class="check-box required">
                        <label>
                            <input
                                type="checkbox"
                                required
                            >
                            <i class="icon"></i> CheckBox
                        </label>
                    </div>
                </div>

                <div class="mt-10"></div>

                <div>
                    <div class="radio-box mr-10">
                        <label>
                            <input
                                type="radio"
                                name="radio"
                            >
                            <i class="icon"></i> Radio Button
                        </label>
                    </div>

                    <div class="radio-box mr-10">
                        <label>
                            <input
                                type="radio"
                                name="radio"
                            >
                            <i class="icon"></i> Radio Button
                        </label>
                    </div>

                    <div class="radio-box disable mr-10">
                        <label>
                            <input
                                type="radio"
                                name="radio"
                                disabled
                            >
                            <i class="icon"></i> Radio Button
                        </label>
                    </div>

                    <div class="radio-box required">
                        <label>
                            <input
                                type="radio"
                                name="radio"
                                required
                            >
                            <i class="icon"></i> Radio Button
                        </label>
                    </div>
                </div>

                <div class="mt-10"></div>

                <div class="input-box quantity">
                    <a
                        href="#"
                        class="minus"
                    >
                        <i class="fal fa-minus"></i>
                    </a>
                    <input type="number">
                    <a
                        href="#"
                        class="plus"
                    >
                        <i class="fal fa-plus"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="title-box mb-30">
        <h2 class="main-title">-Modal Popup</h2>
    </div>

    <button
        type="button"
        class="btn btn-sub2 ml-15"
        v-on:click="openModal"
    >
        <i class="fal fa-search"></i>검색
    </button>
</template>
<script setup>
    import { reactive } from "vue";

    const setup = reactive({
        selectOpen1: false,
        selectOpen2: false,
        monthOpen: false,
        yearOpen: false,
        datepicker: false,
        modal: false,
    });
</script>
<style scoped lang="scss">
.bg > [class^="row"] > [class^="col"] {
    padding: 10px;
    border: 1px solid var(--border-color);
    background-color: var(--content-bg-color);
}
</style>