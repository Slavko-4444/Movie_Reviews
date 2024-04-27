<template>
    <div class="card mb-4">
        <div class="card-body">
            <p>{{ result.content }}</p>
            <div class="d-flex justify-content-between">
                <div class="d-flex flex-row align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30"
                        height="30" viewBox="0 0 30 30">
                        <circle cx="15" cy="15" r="15" :fill="getRandomColor"></circle><text x="50%" y="50%"
                            alignment-baseline="middle" text-anchor="middle" fill="#fff" font-size="1.3rem"
                            font-weight="300" font-family="Roboto">{{ result.user.username[0].toUpperCase() }}</text>
                    </svg>
                    <p class="small mb-0 ms-2">{{ result.user.username }}</p>
                </div>
                <div class="d-flex flex-row align-items-center">
                    <p class="small text-muted mb-0">{{ specDate(result.created_at) }}</p>
                    <i class="far fa-thumbs-up mx-2 fa-xs text-black" style="margin-top: -0.16rem;"></i>
                    <p class="small text-muted mb-0">h</p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    props: ['result'],
    computed: {
        getRandomColor() {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);

            const hexR = r.toString(16).padStart(2, '0');
            const hexG = g.toString(16).padStart(2, '0');
            const hexB = b.toString(16).padStart(2, '0');

            return `#${hexR}${hexG}${hexB}`;
        },
    },
    methods: {
        specDate(dt) {
            try {
                const mainDate = dt.split('.')
                const watchT = mainDate[0].split('T') 
                const releaseDate = watchT[0]
                const parts = releaseDate.split("-");
                return `${watchT[1].slice(0,-3)} ${parts[2]}.${parts[1]}.${parts[0]}`;
                
            } catch (error) {
                return ''
            }
        },
    }
}
</script>

<style></style>