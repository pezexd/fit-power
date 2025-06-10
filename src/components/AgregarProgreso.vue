<script setup lang="ts">
import { defineEmits, reactive, ref } from "vue"
import type { FormSubmitEvent } from '@nuxt/ui'
import { supabase } from "../supabase"
import { userState } from "../store"
import * as z from 'zod'

const schema = z.object({
    date: z.string(),
    training_type: z.string().min(1, "El tipo de entrenamiento es requerido"),
    duration: z.number()
})

type Schema = z.output<typeof schema>

const form = reactive<Partial<Schema>>({
    date: "",
    training_type: "",
    duration: 0
})

const emit = defineEmits(["submitted"])
const toast = useToast()
const loading = ref(false)
const open = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
        loading.value = true;

        const { error } = await supabase.from("progress").insert({
            user_id: userState.id,
            date: event.data.date,
            training_type: event.data.training_type,
            duration: event.data.duration
        })

        if (error) throw error

        open.value = false
        emit("submitted")
    } catch (error) {
        if (error instanceof Error) {
            toast.add({
                icon: 'lucide:circle-alert',
                description: error.message,
            })
        }
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <UModal v-model:open="open" title="Agregar Progreso" close-icon="lucide:x">
        <UButton color="neutral" label="Agregar Progreso" />

        <template #body>
            <UForm @submit="onSubmit" :state="form" :schema="schema" class="space-y-6">
                <UFormField label="Fecha" name="date" required>
                    <UInput type="date" class="w-full" v-model="form.date" />
                </UFormField>

                <UFormField label="Tipo de Entrenamiento" name="training_type" required>
                    <UInput type="text" class="w-full" v-model="form.training_type" />
                </UFormField>

                <UFormField label="Duración" name="duration" required>
                    <UInputNumber class="w-full" v-model="form.duration" :step="5" />
                </UFormField>

                <UButton :loading="loading" type="submit" label="Agregar" block />
            </UForm>
        </template>
    </UModal>
</template>
