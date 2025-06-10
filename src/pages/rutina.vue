<script setup lang="ts">
import { ref, reactive } from "vue"
import { useRouter } from "vue-router"
import type { StepperItem, FormSubmitEvent } from '@nuxt/ui'
import * as z from "zod"

const items = ref<StepperItem[]>([
    {
        slot: 'datos' as const,
        title: 'Datos',
        icon: 'lucide:info'
    },
    {
        slot: 'rutina' as const,
        title: 'Rutina',
        icon: 'lucide:dumbbell'
    }
])

const active = ref(0)
const router = useRouter()

const schema = z.object({
    condicion: z.string().min(1, "La condición es requerida"),
    objetivo: z.string().min(1, "El objetivo es requerido")
})

type Schema = z.output<typeof schema>

const form = reactive<Partial<Schema>>({
    condicion: "",
    objetivo: ""
})

const condiciones = [
    {
        label: 'Baja',
        value: 'baja'
    },
    {
        label: 'Media',
        value: 'media'
    },
    {
        label: 'Alta',
        value: 'alta'
    }
]

const objetivos = [
    {
        label: 'Perder Peso',
        value: 'perder'
    },
    {
        label: 'Ganar Musculo',
        value: 'ganar'
    },
    {
        label: 'Mantener',
        value: 'mantener'
    }
]

interface Rutina {
    title: string
    description: string
    frameSrc: string
}

const rutinas = {
    "alta-ganar": {
        frameSrc: "https://www.youtube.com/embed/3p8EBPVZ2Iw",
        title: "Rutina Avanzada - Objetivo: Ganar Músculo",
        description:
            "Diseñada para maximizar volumen y fuerza muscular en atletas avanzados."
    },
    "alta-mantener": {
        frameSrc: "https://www.youtube.com/embed/9rTnTI2Jg78",
        title: "Rutina Avanzada - Objetivo: Mantener Forma",
        description:
            "Para personas con alto nivel físico que desean conservar su rendimiento."
    },
    "alta-perder": {
        frameSrc: "https://www.youtube.com/embed/A7-cLObbFEU",
        title: "Rutina Avanzada - Objetivo: Perder Peso",
        description:
            "Una rutina intensa para pérdida rápida de grasa y mejora cardiovascular."
    },
    "baja-ganar": {
        frameSrc: "https://www.youtube.com/embed/vc1E5CfRfos",
        title: "Rutina Principiante - Objetivo: Ganar Músculo",
        description:
            "Diseñada para quienes empiezan y quieren comenzar a desarrollar masa muscular."
    },
    "baja-mantener": {
        frameSrc: "https://www.youtube.com/embed/UqB65gs_Lr0",
        title: "Rutina Principiante - Objetivo: Mantener Forma",
        description:
            "Una rutina ligera para conservar tu estado físico actual."
    },
    "baja-perder": {
        frameSrc: "https://www.youtube.com/embed/QOVXlsAfOT0",
        title: "Rutina Principiante - Objetivo: Perder Peso",
        description:
            "Esta rutina está diseñada para personas que inician y quieren perder peso."
    },
    "media-ganar": {
        frameSrc: "https://www.youtube.com/embed/9rTnTI2Jg78",
        title: "Rutina Intermedia - Objetivo: Ganar Músculo",
        description:
            "Esta rutina está diseñada para personas con experiencia básica que quieren desarrollar masa muscular."
    },
    "media-mantener": {
        frameSrc: "https://www.youtube.com/embed/9rTnTI2Jg78",
        title: "Rutina Intermedia - Objetivo: Mantener Forma",
        description:
            "Una rutina activa para mantener tu nivel físico actual."
    },
    "media-perder": {
        frameSrc: "https://www.youtube.com/embed/9rTnTI2Jg78",
        title: "Rutina Intermedia - Objetivo: Perder Peso",
        description:
            "Ideal para quienes ya entrenan y desean adelgazar con más intensidad."
    }
}

const rutina = ref("")

function volver() {
    router.push({
        query: {}
    })
    form.condicion = ""
    form.objetivo = ""
    active.value = 0
}

function finalizarProgreso() {
    router.push("/profile")
}

function onSubmit(event: FormSubmitEvent<Schema>) {
    rutina.value = rutinas[`${event.data.condicion}-${event.data.objetivo}`]
    router.push({
        query: {
            objetivo: event.data.objetivo
        }
    })
    active.value = 1
}
</script>

<template>
    <UContainer class="py-12">
        <h2 class="text-center text-lg font-bold text-highlighted">
            Rutina
        </h2>
        <UStepper v-model="active" :items="items" class="mt-8 w-full" disabled>
            <template #datos>
                <UCard variant="subtle" class="mt-8 max-w-2xl mx-auto">
                    <UForm @submit="onSubmit" :state="form" :schema="schema" class="space-y-6">
                        <UFormField label="Condición" name="condicion">
                            <USelect v-model="form.condicion" :items="condiciones" placeholder="Selecciona tu condición"
                                class="w-full" />
                        </UFormField>

                        <UFormField label="Objetivo" name="objetivo">
                            <USelect v-model="form.objetivo" :items="objetivos" placeholder="Selecciona tu objetivo"
                                class="w-full" />
                        </UFormField>

                        <UButton type="submit" label="Empezar" block />
                    </UForm>
                </UCard>
            </template>
            <template #rutina>
                <UCard variant="subtle" class="mt-8 max-w-2xl mx-auto">
                    <div class="flex flex-col gap-6">
                        <div class="space-y-2">
                            <h2 class="text-lg font-bold text-highlighted">{{ rutina.title }}</h2>
                            <p class="text-sm text-muted">{{ rutina.description }}</p>
                        </div>
                        <iframe width="100%" height="315" :src="rutina.frameSrc" frameborder="0"
                            allowfullscreen></iframe>
                        <div class="flex justify-center items-center gap-3">
                            <UButton @click="volver" variant="link" color="neutral" label="Volver al inicio"
                                icon="lucide:arrow-left" />
                            <AgregarProgreso @submitted="finalizarProgreso" color="primary" />
                        </div>
                    </div>
                </UCard>
            </template>
        </UStepper>
    </UContainer>
</template>
