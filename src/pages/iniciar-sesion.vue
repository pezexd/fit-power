<script setup lang="ts">
import { reactive, ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import type { FormSubmitEvent } from '@nuxt/ui'
import authService from "../services/auth.service.ts"
import { userState } from "../store"
import * as z from 'zod'

const schema = z.object({
    email: z.string().email("Correo electronico inválido"),
    password: z.string().min(8, "La contraseña debe contener al menos 8 caracteres")
})

type Schema = z.output<typeof schema>

const form = reactive<Partial<Schema>>({
    email: "",
    password: "",
})

const router = useRouter()
const toast = useToast()
const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
        loading.value = true;

        await authService.login({
            email: event.data.email,
            password: event.data.password
        })

        toast.add({
            icon: 'lucide:circle-check',
            title: "Has iniciado sesion correctamente!",
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

onMounted(() => {
    if (userState.id) {
        router.push("/profile")
    }
})
</script>

<template>
    <UContainer class="py-16">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="text-center text-2xl/9 font-bold tracking-tight text-default">
                Inicia sesion en tu cuenta
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <UCard variant="subtle">
                <UForm @submit="onSubmit" :state="form" :schema="schema" class="space-y-6">
                    <UFormField label="Correo Electronico" name="email" required>
                        <UInput type="email" class="w-full" v-model="form.email" />
                    </UFormField>

                    <UFormField label="Contraseña" name="password" required>
                        <UInput type="password" class="w-full" v-model="form.password" />
                    </UFormField>

                    <UButton :loading="loading" type="submit" label="Iniciar sesion" block />
                </UForm>
            </UCard>

            <p class="mt-10 text-center text-sm text-muted">
                No eres un miembro?
                {{ ' ' }}
                <ULink to="/registrarse" class="text-primary">
                    Regístrate
                </ULink>
            </p>
        </div>
    </UContainer>
</template>
