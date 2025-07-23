<template>
    <div>
        <Form class="col-md-6" :validation-schema="formSchema" @submit="onSubmit">
            <h1 class="text-center">Eğitmen Bilgileri</h1>
            <div class="mb-4">
                <Field name="firstname" v-model="firstname" v-slot="{ field, errors, errorMessage }">
                    <input type="text" class="form-control" placeholder="Lütfen Adınızı Giriniz" v-bind="field"
                        :class="{ 'is-invalid': errors.length !== 0 }" />
                    <div class="input-alert" v-if="errors.length !== 0">
                        {{ errorMessage }}
                    </div>
                </Field>
            </div>
            <div class="mb-4">
                <Field name="lastname" v-model="lastname" v-slot="{ field, errors, errorMessage }">
                    <input type="text" class="form-control" placeholder="Lütfen Soyadınızı Giriniz" v-bind="field"
                        :class="{ 'is-invalid': errors.length !== 0 }" />
                    <div class="input-alert" v-if="errors.length !== 0">
                        {{ errorMessage }}
                    </div>
                </Field>
            </div>
           <v-btn type="submit" variant="outlined" :loading="loading">Güncelle</v-btn>
        </Form>
    </div>
</template>

<script setup>
import { updateProfile } from '@/composable/user';
import { Field, Form } from 'vee-validate'

const { onSubmit, loading, firstname, lastname, formSchema } = updateProfile()

</script>