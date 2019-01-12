<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>写真を投稿する</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-img :src="imageUrl" height="150" v-if="imageUrl" align-center contain/>
                <v-text-field label="写真を選ぶ" @click="pickFile" v-model="imageName" required prepend-icon="attach_file">
                </v-text-field>
                <input
                    type="file"
                    style="display: none"
                    ref="image"
                    accept="image/*"
                    @change="onFilePicked"
                >
               <v-textarea name="description" label="説明を書く" id="description"
                             type="text" required v-model="description" counter="200"
                             :rules="descriptionRules" full-width height="10em" single-line>
               </v-textarea>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" :disabled="!valid" @click="submit">投稿</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
        name: 'upload',
        data() {
            const maxDescriptionLength = 200;
            return {
                valid: false,
                imageName: '',
                imageUrl: '',
                imageFile: '',
                description: '',
                descriptionRules: [
                    v => v.length > 0,
                    v => v.length <= maxDescriptionLength || `説明は最大 ${maxDescriptionLength} 文字まで入力可能です`
                ]
            }
        },
        methods: {
            pickFile() {
                this.$refs.image.click()
            },
            onFilePicked(event) {
                const files = event.target.files
			    if(files[0] !== undefined) {
			    	this.imageName = files[0].name
			    	if(this.imageName.lastIndexOf('.') <= 0) {
			    		return
			    	}
			    	const fr = new FileReader ()
			    	fr.readAsDataURL(files[0])
			    	fr.addEventListener('load', () => {
			    		this.imageUrl = fr.result
			    		this.imageFile = files[0]
			    	})
			    } else {
			    	this.imageName = ''
			    	this.imageFile = ''
			    	this.imageUrl = ''
			    }
            },
            submit() {
                return;
            }
        },
    }
</script>