<template>
    <div class="d-flex justify-content-center">
        <nav class="my-5" aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item">
                    <a class="page-link" @click="goTo(pageId-1)">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item" v-for="page in noPages" :key="page"><a :class="setBackground(page) + ' page-link'" @click="goTo(page)">{{ page }}</a>
                </li>

                <li class="page-item">
                    <a class="page-link" @click="goTo(pageId+1)">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    props: ['noPages', 'previous', 'next', 'reLoad', 'pageId'],
    watch: {
        previous() {
        this.currentPage();
    },
    next() {
        this.currentPage();
    }
    },
    methods: {
        takePgInfoFromUrl(url) {
            const match = url.match(/page=(\d+)/);
            return match ? parseInt(match[1]) : null;
        },
        setBackground(id){
            if (id === this.pageId)
                return 'bg-primary text-white'
            return ''
        },
        goTo(pageNumber){
            if(pageNumber > this.noPages || pageNumber < 1)
                return
            this.reLoad(pageNumber)
        }
    }
}
</script>
<style>
a:hover{
    cursor: pointer;
}
</style>