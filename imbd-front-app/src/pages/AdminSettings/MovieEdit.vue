<template>
    <table class="table table-striped table-hover">
        <thead>
            <th>Title</th>
            <th>Date Of Release</th>
            <th>Director</th>
            <th>Genre</th>
            <th>Rating</th>
        </thead>
        <tbody>
            <tr v-for="track in watchList" :key="track" @click="openEditForm(track)">
                <td>{{ track.title }}</td>
                <td>{{ track.date_of_release }}</td>
                <td>{{ track.director.first_name }} {{ track.director.last_name }}</td>
                <td><span v-for="genre in track.genre" :key="genre" class="mx-2 badge bg-secondary">{{ genre.genre_name
                        }}</span></td>
                <td>{{ track.avg_rating }}</td>
            </tr>

        </tbody>
    </table>
</template>

<script>
export default {
    props: ['watchList', 'typeInfo'],
    methods: {

        openEditForm(track) {
            this.$emit('edit-info', {who: this.typeInfo, item: track})
        }
    },

}
</script>

<style></style>