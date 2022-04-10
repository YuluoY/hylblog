import {createVueComponent} from "../util/dom.js";
import {themeMapping} from "../util/core.js";

export const Card = createVueComponent('Card', {
    name: 'Card',
    template: `
        <div id="Card" 
            ref="card"
            @mouseover="changeColor"
            @mouseleave="blurColor"
            @click="toArticle"> 
            <div class="card-box">
                <div class="card-title">{{$attrs.title}}</div>
                <div>
                    <span class="card-name">作者：{{$attrs.name}}</span>
                    <span class="card-date">时间：{{$attrs.date}}</span>
                    <span class="card-category">类别：{{$attrs.category}}</span>
                </div> 
            </div>           
        </div>
    `,
    methods: {
        changeColor() {
            const card = this.$refs.card;
            const currThemeColor = localStorage.getItem('valid-theme') || 'vue';
            card.style.color = themeMapping.get(currThemeColor);
        },
        blurColor() {
            const card = this.$refs.card;
            card.style.color = '#7F7F7F';
        },
        toArticle() {
            if (this.$attrs.external) {
                window.open(this.$attrs.href);
            } else {
                location.href = '#/' + this.$attrs.href;
            }
        },
    },
});

export const CardPagination = createVueComponent('CardPagination', {
    name: 'CardPagination',
    template: `
        <div id="cardPagination" v-if="isShow">
            <div v-for="(data, i) in dataArrTemp" :key="i">
                <Card :href="data.href"
                    :title="data.title"
                    :name="data.name"
                    :date="data.date"
                    :external="data.external"
                    :category="data.category"></Card>
            </div>
            <div class="paging-list">
                <button v-for="(btn, i) in pagingBtn" 
                    :class="(i===0 ? 'pagingActive':'')"
                    :style="'background-color:' + (i===0 ? initPaginationBtnBg():'')"
                    @click="pagingHandle">
                    {{i + 1}}
                </button>
                <div>
                    <button @click="nextPage">Next</button>
                    <span style="font-weight: bolder; font-size: 1.2em">Jump To</span>
                    <input v-model.number="currPage" 
                        @blur="goPage"
                        style="width: 30px; text-align: center;outline: none;">
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            dataArrTemp: [],
            dataArr: [],
            pagination: 5,
            pagingBtn: 0,
            currPage: 1,
            isShow: true,
        }
    },
    methods: {
        initPaginationBtnBg() {
            return themeMapping.get(localStorage.getItem('valid-theme') || 'vue');
        },
        pagingHandle(event) {
            const pageBtn = event.target;
            pageBtn.className = 'pagingActive';
            $(pageBtn).addClass('pagingActive').css('background-color', this.initPaginationBtnBg());
            $(pageBtn).siblings().removeClass('pagingActive').css('background-color', '');
            let s = (parseInt(pageBtn.innerText) - 1) * this.pagination;
            this.dataArrTemp = this.dataArr.slice(s, s + this.pagination);
            this.currPage = parseInt(pageBtn.innerText);
        },
        goPage() {
            if (this.currPage >= 0 && this.currPage <= Math.ceil(this.dataArr.length / this.pagination)) {
                Array.from($('.paging-list button')).forEach(ele => {
                    if ((ele.innerText * 1) === this.currPage) {
                        ele.click();
                    }
                })
            } else {
                this.currPage = 1;
                this.goPage();
            }
        },
        nextPage() {
            if (this.currPage >= Math.ceil(this.dataArr.length / this.pagination)) {
                alert("已经是最后一页啦！")
            } else {
                this.currPage += 1;
                this.goPage();
            }
        }
    },
    mounted() {
        let VNodeArr = this.$slots.default;
        VNodeArr.forEach(VNode => {
            if (VNode.tag) {
                this.dataArr.push(VNode.data.attrs)
            }
        })
        this.dataArrTemp = this.dataArr.slice(0, this.pagination);
        this.pagingBtn = Math.ceil(this.dataArr.length / this.pagination);
    }
})

export const TimeLineBox = createVueComponent('timeline-box', {
    name: 'timeline-box',
    template: `
        <div id="timeLineBox" class="custom-bg-white">
        <div class="jazz-timeline-wrapper" id="skrollr-body">
            <div class="jazz-timeline white-timeline bordered-timeline one-sided">
                <div class="timeLineYear">{{$attrs.timelineyear}}</div>
                <slot></slot>
            </div><!-- .timeline -->
        </div><!-- .jazz-timeline-wrapper -->
        </div>
    `,


})
export const TimeLine = createVueComponent('time-line', {
    name: 'time-line',
    template: `
        <div id="timeLine">
         <div class="timeline-post">
                    <div class="timeline-meta for-large-icons">
                    \t<div class="meta-details">{{$attrs.name}}</div>
                    </div> 
                    <div :class="classArr[randomNum()]" 
                         onclick="$valid.util.event.TimeLineBtnActive(this)">
                    \t<div class="icon-placeholder">{{$attrs.month_day}}</div>
                        <div class="timeline-bar"></div>
                    </div>
                    <div class="timeline-content" @click="toArticle">
                        <h2 class="content-title">{{$attrs.title}}</h2>
                        <div class="content-details">
                            <p v-html="'&emsp;&emsp;'+$attrs.content"></p>
                        </div>
                    </div><!-- timeline content -->
            </div><!-- .timeline-post --> 
        </div>
    `,
    data() {
        return {
            classArr: ['turqoise', 'black', 'brown', 'indigo',
                'purple', 'grey', 'blue', 'red', 'orange',
                'opal', 'green', 'pink']
        }
    },
    methods: {
        toArticle() {
            if (this.$attrs.external) {
                window.open(this.$attrs.href);
            } else {
                location.href = location.href.split('#')[0] + '#/' + this.$attrs.href;
            }
        },
        randomNum() {
            return Math.floor(Math.random() * this.classArr.length);
        },
    },
    mounted() {
        this.classArr = this.classArr.map((c) => {
            return `timeline-icon icon-larger iconbg-${c} icon-color-white`
        });
    },
})