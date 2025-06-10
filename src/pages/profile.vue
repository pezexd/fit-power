<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Progress } from "../types"
import { ref, onMounted } from "vue"
import { supabase } from "../supabase"
import { userState } from "../store"

const progress = ref([])

const columns: TableColumn<Progress>[] = ref([
    {
        accessorKey: 'training_type',
        header: 'Tipo de entrenamiento',
        cell: ({ row }) => row.getValue('training_type')
    },
    {
        accessorKey: 'date',
        header: 'Fecha',
        cell: ({ row }) => row.getValue('date')
    },
    {
        accessorKey: 'duration',
        header: 'Duración',
        cell: ({ row }) => `${row.getValue('duration')} minutos`
    },
])

async function getProgress() {
    const { data } = await supabase.from('progress').select("*")
    progress.value = data
}

onMounted(() => {
    getProgress()
})
</script>

<template>
    <UContainer class="py-12">
        <h1 class="text-center text-3xl font-bold">Perfil</h1>
        <UCard variant="subtle" class="mt-8">
            <h2 class="text-base font-semibold text-highlighted">Informacion Personal</h2>
            <div class="mt-4 sm:mt-6">
                <dl class="space-y-4 sm:space-y-6">
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm/6 font-medium text-highlighted">Nombre Completo</dt>
                        <dd class="mt-1 text-sm/6 text-muted sm:col-span-2 sm:mt-0">{{ userState.user_metadata.name }}
                        </dd>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm/6 font-medium text-highlighted">Fecha de Nacimiento</dt>
                        <dd class="mt-1 text-sm/6 text-muted sm:col-span-2 sm:mt-0">
                            {{ new Date(userState.user_metadata.date_of_birth).toLocaleDateString('es-ES', {
                                day:
                                    '2-digit', month: 'long', year: 'numeric'
                            })
                            }}
                        </dd>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt class="text-sm/6 font-medium text-highlighted">Peso</dt>
                        <dd class="mt-1 text-sm/6 text-muted sm:col-span-2 sm:mt-0">
                            {{ userState.user_metadata.weight }} kg/s
                        </dd>
                    </div>
                </dl>
            </div>
        </UCard>

        <UCard v-if="progress.length" variant="subtle" class="mt-8">
            <template #header>
                <div class="flex items-center justify-between">
                    <h2 class="text-base font-semibold text-highlighted">Progresos</h2>
                    <AgregarProgreso @submitted="getProgress" />
                </div>
            </template>
            <UTable :data="progress" :columns="columns" class="flex-1 -m-4 sm:-m-6" />
        </UCard>
    </UContainer>
</template>
