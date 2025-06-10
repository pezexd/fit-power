<script setup lang="ts">
const items = [
    { img: "./img/construye.webp", label: "Construye tu mejor version" },
    { img: "./img/entrena.webp", label: "Entrena en cualquier lugar" },
    { img: "./img/logra.webp", label: "Logra el fisico que deseas" }
]
</script>

<template>
    <UContainer class="flex flex-col gap-8 py-16">
        <div class="mx-auto max-w-3xl text-center">
            <h2 class="text-5xl font-semibold tracking-tight text-default sm:text-7xl">
                Eleva tu entrenamiento. Transforma tu cuerpo.
            </h2>
            <p class="mt-8 text-lg font-medium text-pretty text-muted sm:text-xl/8">
                Descubre el poder de un entrenamiento bien diseñado y alcanza tus
                objetivos de manera eficiente. Ya sea que busques mejorar tu
                resistencia, aumentar tu fuerza o mantenerte activo, tenemos rutinas
                pensadas para ti.
            </p>

            <UButton class="mt-4" to="/iniciar-sesion" label="Empezar ahora" size="xl" />
        </div>
        <UCarousel v-slot="{ item }" :autoplay="{ delay: 2000 }" :items="items" class="w-full mx-auto" arrows>
            <div class="relative aspect-[21/9] min-h-[300px] w-full rounded-lg">
                <img class="h-full w-full object-cover rounded-lg" :src="item.img">
                <div class="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40"></div>
                <div class="absolute inset-0 flex flex-col justify-center p-4 md:p-10">
                    <div class="max-w-screen space-y-3 md:space-y-5">
                        <UContainer>
                            <h2
                                class="text-4xl font-bold tracking-tight md:text-4xl lg:text-6xl xl:text-8xl text-white">
                                {{ item.label }}
                            </h2>
                        </UContainer>
                    </div>
                </div>
            </div>
        </UCarousel>
    </UContainer>
</template>
