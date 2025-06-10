<script setup lang="ts">
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import type { FormSubmitEvent } from '@nuxt/ui'
import authService from "../services/auth.service.ts"
import * as z from 'zod'

const schema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    email: z.string().email("Correo electronico inválido"),
    password: z.string().min(8, "La contraseña debe contener al menos 8 caracteres"),
    date_of_birth: z.string().min(1, "La fecha de nacimiento es requerida"),
    weight: z.number(),
})

type Schema = z.output<typeof schema>

const form = reactive<Partial<Schema>>({
    name: "",
    email: "",
    password: "",
    date_of_birth: "",
    weight: 0
})

const router = useRouter();
const toast = useToast();
const loading = ref(false);

async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
        loading.value = true;

        await authService.register({
            email: event.data.email,
            password: event.data.password,
            name: event.data.name,
            date_of_birth: event.data.date_of_birth,
            weight: event.data.weight,
        })

        toast.add({
            icon: 'lucide:circle-check',
            title: "Te has registrado correctamente!",
        })
        router.push("/profile")
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
    <UContainer class="py-16">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="text-center text-2xl/9 font-bold tracking-tight text-default">
                Registrarse
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <UCard variant="subtle">
                <UForm @submit="onSubmit" :state="form" :schema="schema" class="space-y-6">
                    <UFormField label="Nombre Completo" name="name" required>
                        <UInput type="text" class="w-full" v-model="form.name" />
                    </UFormField>

                    <UFormField label="Correo Electronico" name="email" required>
                        <UInput type="email" class="w-full" v-model="form.email" />
                    </UFormField>

                    <UFormField label="Peso (Kg)" name="weight" required>
                        <UInput type="number" class="w-full" v-model="form.weight" />
                    </UFormField>

                    <UFormField label="Fecha de Nacimiento" name="date_of_birth" required>
                        <UInput type="date" class="w-full" v-model="form.date_of_birth" />
                    </UFormField>

                    <UFormField label="Contraseña" name="password" required>
                        <UInput type="password" class="w-full" v-model="form.password" />
                    </UFormField>

                    <UButton type="submit" label="Registrarse" block />
                </UForm>
            </UCard>

            <p class="mt-10 text-center text-sm text-muted">
                Ya eres un miembro?
                {{ ' ' }}
                <ULink to="/iniciar-sesion" class="text-primary">
                    Inicia sesion
                </ULink>
            </p>
        </div>
    </UContainer>
</template>
