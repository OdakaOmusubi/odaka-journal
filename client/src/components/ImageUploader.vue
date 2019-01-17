<template>
    <v-container>
        <v-layout v-if="imageInfo.imageUrl">
            <v-img :src="imageInfo.imageUrl" align-center contain/>
        </v-layout>
        <v-layout v-else justify-center>
            <v-btn @click="pickFile">画像を選択</v-btn>
            <input
                type="file"
                style="display: none"
                ref="image"
                accept="image/*"
                @change="onFilePicked"
            >
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'ImageUploader',
    data() {
        return {
            imageInfo: {
                imageFile: '',
                imageUrl: ''
            }
        }
    },
    methods: {
        pickFile() {
            this.$refs.image.click();
        },
        onFilePicked(event) {
            const files = event.target.files;
            if (files[0] !== undefined) {
                if (files[0].name.lastIndexOf('.') <= 0) {
                    return;
                }
                const fr = new FileReader();
                fr.readAsDataURL(files[0]);
                fr.addEventListener('load', () => {
                    this.imageInfo.imageUrl = fr.result;
                    this.imageInfo.imageFile = files[0];
                    this.$emit('childToParent', this.imageInfo);
                });
            } else {
                this.imageInfo.imageFile = '';
                this.imageInfo.imageUrl = '';
            }
        }
    }
};
</script>
