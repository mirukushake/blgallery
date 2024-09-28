<script setup lang="ts">
import { ref, Ref, inject } from "vue"
import toPairs from "lodash/toPairs"
import fromPairs from "lodash/fromPairs"
import cloneDeep from "lodash/cloneDeep"
import differenceWith from "lodash/differenceWith"
import isEqual from "lodash/isEqual"
import { Dialog, Series, MetadataAuthors } from "../models/models"
import { useI18n } from "vue-i18n"
import { storeToRefs } from "pinia"
import { bookListStore, userSessionStore } from "../store"
import { useToast } from "primevue/usetoast"
const store = bookListStore()
const { apiFetch } = store
const { records, metadata } = storeToRefs(store)
const userSession = userSessionStore()
const toast = useToast()

const { t, locale } = useI18n({ useScope: "global" })

interface LocaleName {
  ja: string
  en: string
}

const dialogRef = inject<Ref<Dialog>>("dialogRef")
const record = ref()
const loading = ref(false)
const editMode = ref(false)
const editRecordOriginal = ref()
const editRecordUpdated = ref({
  id: null,
  title: null,
  cover: null,
  status_id: null,
  rating: null,
  manga: false,
  location_id: null,
  label_id: null,
  published: null,
  added: null,
  notes: null,
  series_id: null,
  series_no: null,
  chil_url: null,
  authors: [] as any[],
  read: null,
  tone: null,
  seme: null,
  uke: null,
  settei: null,
  play: null,
  tags: null,
})
const seriesVisible = ref(false)
const authorVisible = ref(false)
const newSeries = ref({
  ja: null,
  complete: false,
})
const newAuthor = ref({
  name: null,
  reading: null,
  illustrator: false,
})

const seriesPop = ref()
const seriesToggle = (event: any) => {
  seriesPop.value.toggle(event)
}
const authorPop = ref()
const authorToggle = (event: any) => {
  authorPop.value.toggle(event)
}

record.value = dialogRef?.value.data!

function enterEdit() {
  editMode.value = true

  const { status, location, series, label, author_sort, ...updatedObj } =
    record.value

  const format = {
    ...updatedObj,
    authors: record.value.authors
      ? record.value.authors.map((t: any) => t.id)
      : null,
    tone: record.value.tone ? record.value.tone.map((t: any) => t.id) : null,
    seme: record.value.seme ? record.value.seme.map((t: any) => t.id) : null,
    uke: record.value.uke ? record.value.uke.map((t: any) => t.id) : null,
    settei: record.value.settei
      ? record.value.settei.map((t: any) => t.id)
      : null,
    play: record.value.play ? record.value.play.map((t: any) => t.id) : null,
    tags: record.value.tags ? record.value.tags.map((t: any) => t.id) : null,
    read: record.value.read ? record.value.read[0] : null,
  }

  editRecordOriginal.value = cloneDeep(format)
  editRecordUpdated.value = cloneDeep(format)
}

async function submitBook() {
  const newObj = differenceWith(
    toPairs(editRecordUpdated.value),
    toPairs(editRecordOriginal.value),
    isEqual
  )

  const editValues = fromPairs(newObj) as any

  if (editValues.authors) {
    const map = editValues.authors.map((x: any, index: number) => ({
      author_id: x,
      order: index + 1,
    }))

    editValues.authors = map
  }

  try {
    const { data, isFetching, statusCode } = await apiFetch(
      `/books/${record.value.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(editValues),
      }
    ).json()
    console.log(data.value.data)
    loading.value = isFetching.value
    if (statusCode.value === 200 && data) {
      const target = records.value.find((x) => x.id === data.value.data[0].id)
      Object.assign(target as any, data.value.data[0])
      record.value = data.value.data[0]
    }
  } catch (error) {
    console.log(error)
  } finally {
    showAlert()
    editMode.value = false
  }
}

async function submitSeries() {
  try {
    const { data, isFetching, statusCode } = await apiFetch<Series>("/series", {
      method: "POST",
      body: JSON.stringify(newSeries.value),
    }).json()

    console.log(data.value.data)

    loading.value = isFetching.value
    if (statusCode.value === 201 && data) {
      metadata.value!.series.push(data.value.data as Series)
      editRecordUpdated.value.series_id = data.value?.data.id
    }
  } catch (error) {
    console.log(error)
  } finally {
    newSeries.value.complete = false
    newSeries.value.ja = null
    seriesVisible.value = false
  }
}

async function submitAuthor() {
  try {
    const { data, isFetching, statusCode } = await apiFetch<MetadataAuthors>(
      "/authors",
      {
        method: "POST",
        body: JSON.stringify(newAuthor.value),
      }
    ).json()

    console.log(data.value.data)

    loading.value = isFetching.value
    if (statusCode.value === 201 && data) {
      metadata.value!.authors.push(data.value.data as MetadataAuthors)
      editRecordUpdated.value.authors.push(data.value.data.id)
    }
  } catch (error) {
    console.log(error)
  } finally {
    authorVisible.value = false
    newAuthor.value.name = null
    newAuthor.value.reading = null
    newAuthor.value.illustrator = false
  }
}

const showAlert = () => {
  toast.add({
    severity: "success",
    summary: "Info",
    detail: "Book edited successfully",
    life: 3000,
  })
}
</script>

<template>
  <div class="flex flex-col md:flex-row w-full mb-6" v-if="record && !editMode">
    <div class="w-full md:w-4/12 md:mr-8">
      <div v-if="record.cover">
        <img
          alt="book cover"
          :src="record.cover"
          class="object-contain md:object-top w-full h-96 md:h-auto"
        />
      </div>
      <div v-else>
        <span
          ><div
            class="object-cover object-top h-48 w-full flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg></div
        ></span>
      </div>
    </div>

    <div class="text-wrap">
      <dl>
        <dt class="text-sm text-gray-400 uppercase">title</dt>
        <dd class="font-bold mb-4 text-lg">{{ record.title }}</dd>

        <dt class="text-sm text-gray-400 uppercase">author(s)</dt>
        <dd class="mb-4">
          <span
            v-if="record.authors"
            v-for="(author, index) in record.authors?.sort((a: any, b: any) => a.order - b.order)"
            :class="{ 'ml-2': index > 0 }"
            >{{ author.name }}</span
          >
        </dd>
        <span v-if="record.series">
          <dt class="text-sm text-gray-400 uppercase">series</dt>
          <dd class="mb-4">{{ record.series.ja }} #{{ record.series_no }}</dd>
        </span>
        <span class="flex">
          <span class="mr-6">
            <dt class="text-sm text-gray-400 uppercase">type</dt>
            <dd class="mb-4">
              {{ record.manga === false ? t("novel") : t("manga") }}
            </dd>
          </span>
          <span class="mr-6">
            <dt class="text-sm text-gray-400 uppercase">label</dt>
            <dd class="mb-4" v-if="record.label">{{ record.label?.ja }}</dd>
          </span>
          <span>
            <dt class="text-sm text-gray-400 uppercase">published</dt>
            <dd class="mb-4">{{ record.published }}</dd>
          </span>
        </span>
        <span>
          <span class="flex flex-wrap gap-x-6">
            <span class="">
              <dt class="text-sm text-gray-400 uppercase">status</dt>
              <dd class="mb-4">
                {{ record.status![locale as keyof LocaleName] }}
                <span v-if="record.rating" class="ml-1"
                  ><i class="pi pi-star-fill text-yellow-400"></i>
                  {{ record.rating }}</span
                >
              </dd>
            </span>
            <span class="">
              <dt class="text-sm text-gray-400 uppercase">location</dt>
              <dd class="mb-4" v-if="record.location">
                {{ record.location.ja }}
              </dd>
            </span>
            <span class="">
              <dt class="text-sm text-gray-400 uppercase">date added</dt>
              <dd class="mb-4">{{ record.added }}</dd>
            </span>
            <span class="">
              <dt class="text-sm text-gray-400 uppercase">date(s) read</dt>
              <dd class="mb-4">
                <span
                  v-if="record.read"
                  v-for="(date, index) in record.read.sort((a: any, b: any) => a - b)"
                  :class="{ 'ml-2': index > 0 }"
                  >{{ date }}</span
                >
              </dd>
            </span>
          </span>
          <dt class="text-sm text-gray-400 uppercase">seme</dt>
          <dd class="mb-4">
            <Tag
              v-for="(tag, index) in record.seme"
              severity="secondary"
              :class="{ 'mr-2 mb-2': index !== record.seme.length - 1 }"
              >{{ tag[locale as keyof LocaleName] }}</Tag
            >
          </dd>
          <dt class="text-sm text-gray-400 uppercase">uke</dt>
          <dd class="mb-4">
            <Tag
              v-for="(tag, index) in record.uke"
              severity="secondary"
              :class="{ 'mr-2 mb-2': index !== record.uke.length - 1 }"
              >{{ tag[locale as keyof LocaleName] }}</Tag
            >
          </dd>
          <dt class="text-sm text-gray-400 uppercase">setting/tropes</dt>
          <dd class="mb-4">
            <Tag
              v-for="(tag, index) in record.settei"
              severity="secondary"
              :class="{ 'mr-2 mb-2': index !== record.settei.length - 1 }"
              >{{ tag[locale as keyof LocaleName] }}</Tag
            >
          </dd>
          <dt class="text-sm text-gray-400 uppercase">tone</dt>
          <dd class="mb-4">
            <Tag
              v-for="(tag, index) in record.tone"
              severity="secondary"
              :class="{ 'mr-2 mb-2': index !== record.tone.length - 1 }"
              >{{ tag[locale as keyof LocaleName] }}</Tag
            >
          </dd>
          <dt class="text-sm text-gray-400 uppercase">play</dt>
          <dd class="mb-4">
            <Tag
              v-for="(tag, index) in record.play"
              severity="secondary"
              :class="{ 'mr-2 mb-2': index !== record.play.length - 1 }"
              >{{ tag[locale as keyof LocaleName] }}</Tag
            >
          </dd>
          <dt class="text-sm text-gray-400 uppercase">other tags</dt>
          <dd class="mb-4">
            <Tag
              v-for="(tag, index) in record.tags"
              severity="secondary"
              :class="{ 'mr-2 mb-2': index !== record.tags.length - 1 }"
              >{{ tag[locale as keyof LocaleName] }}</Tag
            >
          </dd>
          <dt class="text-sm text-gray-400 uppercase">notes</dt>
          <dd class="">{{ record.notes }}</dd>
        </span>
      </dl>
    </div>
  </div>
  <div class="flex flex-col md:flex-row w-full mb-6" v-if="record && editMode">
    <div class="w-full md:w-4/12 md:mr-8">
      <div v-if="record.cover">
        <img
          alt="book cover"
          :src="record.cover"
          class="object-contain md:object-top w-full h-96 md:h-auto"
        />
      </div>
      <div v-else>
        <span
          ><div
            class="object-cover object-top h-48 w-full flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg></div
        ></span>
      </div>
      <InputText
        v-model="editRecordUpdated.cover"
        type="text"
        size="small"
        placeholder="Cover"
        class="w-full mb-4"
      />
    </div>

    <div class="text-wrap">
      <dl>
        <dt class="text-sm text-gray-400 uppercase">title</dt>
        <dd class="font-bold mb-4 text-lg">
          <InputText
            v-model="editRecordUpdated.title"
            type="text"
            placeholder="Cover"
          />
        </dd>

        <dt class="text-sm text-gray-400 uppercase">author(s)</dt>
        <dd class="mb-4">
          <MultiSelect
            v-model="editRecordUpdated.authors"
            display="chip"
            :options="metadata?.authors"
            option-value="id"
            option-label="name"
            filter
            placeholder="Select authors"
            class=""
          />
          <Button
            icon="pi pi-plus"
            rounded
            aria-label="Filter"
            @click="authorToggle"
            class="ml-4"
          />
          <Popover ref="authorPop">
            <div class="flex items-center gap-4 mb-4 w-96 md:w-auto">
              <label for="authorname" class="font-semibold w-24"
                >Author name</label
              >
              <InputText
                id="authorname"
                class="flex-auto w-80"
                v-model="newAuthor.name"
              />
            </div>
            <div class="flex items-center gap-4 mb-8">
              <label for="authorreading" class="font-semibold w-24"
                >Reading</label
              >
              <InputText
                id="authorreading"
                class="flex-auto w-80"
                v-model="newAuthor.reading"
              />
            </div>
            <div class="flex items-center gap-4 mb-8">
              <label for="authorillust" class="font-semibold w-24"
                >Illustrator</label
              >
              <ToggleButton
                v-model="newAuthor.illustrator"
                onLabel="Yes"
                offLabel="No"
                id="authorillust"
              />
            </div>
            <div class="flex justify-end gap-2">
              <Button
                type="button"
                label="Cancel"
                severity="secondary"
                @click="authorToggle"
              ></Button>
              <Button
                type="button"
                label="Save"
                :disabled="loading"
                @click="submitAuthor"
              ></Button>
            </div>
          </Popover>
        </dd>
        <span>
          <dt class="text-sm text-gray-400 uppercase">series</dt>
          <dd class="mb-4">
            <Select
              v-model="editRecordUpdated.series_id"
              :options="metadata?.series"
              option-value="id"
              option-label="ja"
              filter
              showClear
              placeholder="Series"
              class="w-4/12 mr-4"
            />
            #<InputNumber
              v-model="editRecordUpdated.series_no"
              placeholder="#"
              :inputStyle="{ width: '3rem' }"
            />
            <Button
              icon="pi pi-plus"
              rounded
              aria-label="Filter"
              @click="seriesToggle"
              class="ml-4"
            />
            <Popover ref="seriesPop">
              <div class="flex items-center gap-4 mb-4 w-96 md:w-auto">
                <label for="seriesname" class="font-semibold w-24"
                  >Series name</label
                >
                <InputText
                  id="seriesname"
                  class="flex-auto w-80"
                  v-model="newSeries.ja"
                />
              </div>
              <div class="flex items-center gap-4 mb-8">
                <label for="complete" class="font-semibold w-24"
                  >Complete</label
                >
                <ToggleButton
                  v-model="newSeries.complete"
                  onLabel="Yes"
                  offLabel="No"
                  id="complete"
                />
              </div>
              <div class="flex justify-end gap-2">
                <Button
                  type="button"
                  label="Cancel"
                  severity="secondary"
                  @click="seriesToggle"
                ></Button>
                <Button
                  type="button"
                  label="Save"
                  :disabled="loading"
                  @click="submitSeries"
                ></Button>
              </div>
            </Popover>
          </dd>
        </span>
        <span class="flex flex-wrap">
          <span class="mr-6">
            <dt class="text-sm text-gray-400 uppercase">type</dt>
            <dd class="mb-4">
              <ToggleButton
                v-model="editRecordUpdated.manga"
                class="w-24"
                onLabel="漫画"
                offLabel="小説"
              />
            </dd>
          </span>
          <span class="mr-6">
            <dt class="text-sm text-gray-400 uppercase">label</dt>
            <dd class="mb-4">
              <Select
                v-model="editRecordUpdated.label_id"
                :options="metadata?.labels"
                option-value="id"
                option-label="ja"
                filter
                showClear
                placeholder="Label"
                class="mr-4"
              />
            </dd>
          </span>
          <span>
            <dt class="text-sm text-gray-400 uppercase">published</dt>
            <dd class="mb-4">
              <InputText
                v-model="editRecordUpdated.published"
                type="text"
                placeholder="Published"
                class="w-36"
              />
            </dd>
          </span>
        </span>
        <span>
          <span class="flex flex-wrap">
            <span class="mr-6">
              <dt class="text-sm text-gray-400 uppercase">status</dt>
              <dd class="mb-4">
                <Select
                  v-model="editRecordUpdated.status_id"
                  :options="metadata?.status"
                  option-value="id"
                  option-label="en"
                  filter
                  placeholder="Status"
                  class=""
                />
                <span class="ml-2"
                  ><i class="pi pi-star-fill text-yellow-400"></i>
                  <InputNumber
                    v-model="editRecordUpdated.rating"
                    inputId="rating"
                    :minFractionDigits="0"
                    :maxFractionDigits="1"
                    :min="1"
                    :max="5"
                    :inputStyle="{ width: '3rem' }"
                /></span>
              </dd>
            </span>
            <span class="mr-6">
              <dt class="text-sm text-gray-400 uppercase">location</dt>
              <dd class="mb-4">
                <Select
                  v-model="editRecordUpdated.location_id"
                  :options="metadata?.locations"
                  option-value="id"
                  option-label="ja"
                  filter
                  showClear
                  placeholder="Location"
                  class=""
                />
              </dd>
            </span>
            <span class="mr-6">
              <dt class="text-sm text-gray-400 uppercase">date added</dt>
              <dd class="mb-4">{{ record.added }}</dd>
            </span>
            <span class="md:ml-6">
              <dt class="text-sm text-gray-400 uppercase">date(s) read</dt>
              <!-- change to simple array later -->

              <dd class="mb-4">
                <InputText
                  v-model="editRecordUpdated.read"
                  type="text"
                  placeholder="Read"
                  class="w-36"
                />
              </dd>
            </span>
          </span>
          <dt class="text-sm text-gray-400 uppercase">seme</dt>
          <dd class="mb-4">
            <MultiSelect
              v-model="editRecordUpdated.seme"
              display="chip"
              :options="metadata?.seme"
              option-value="id"
              option-label="ja"
              filter
              placeholder="Select seme traits"
              class=""
            />
          </dd>
          <dt class="text-sm text-gray-400 uppercase">uke</dt>
          <dd class="mb-4">
            <MultiSelect
              v-model="editRecordUpdated.uke"
              display="chip"
              :options="metadata?.uke"
              option-value="id"
              option-label="ja"
              filter
              placeholder="Select uke traits"
              class=""
            />
          </dd>
          <dt class="text-sm text-gray-400 uppercase">setting/tropes</dt>
          <dd class="mb-4">
            <MultiSelect
              v-model="editRecordUpdated.settei"
              display="chip"
              :options="metadata?.settei"
              option-value="id"
              option-label="ja"
              filter
              placeholder="Select tropes/settings"
              class=""
            />
          </dd>
          <dt class="text-sm text-gray-400 uppercase">tone</dt>
          <dd class="mb-4">
            <MultiSelect
              v-model="editRecordUpdated.tone"
              display="chip"
              :options="metadata?.tone"
              option-value="id"
              option-label="ja"
              filter
              placeholder="Select tone"
              class=""
            />
          </dd>
          <dt class="text-sm text-gray-400 uppercase">play</dt>
          <dd class="mb-4">
            <MultiSelect
              v-model="editRecordUpdated.play"
              display="chip"
              :options="metadata?.play"
              option-value="id"
              option-label="ja"
              filter
              placeholder="Select play"
              class=""
            />
          </dd>
          <dt class="text-sm text-gray-400 uppercase">other tags</dt>
          <dd class="mb-4">
            <MultiSelect
              v-model="editRecordUpdated.tags"
              display="chip"
              :options="metadata?.tags"
              option-value="id"
              option-label="ja"
              filter
              placeholder="Select tags"
              class=""
            />
          </dd>
          <dt class="text-sm text-gray-400 uppercase">notes</dt>
          <dd class="">
            <Textarea v-model="editRecordUpdated.notes" rows="2" c />
          </dd>
        </span>
      </dl>
      <Button
        type="button"
        label="Save"
        :disabled="loading"
        @click="submitBook"
        @keyup.enter="submitBook"
        class="mt-4"
      ></Button>
    </div>
  </div>
  <div class="flex justify-end w-full">
    <Button
      v-if="userSession.session && !editMode"
      icon="pi pi-pencil"
      severity="secondary"
      rounded
      outlined
      aria-label="Edit"
      class="ml-4"
      @click="enterEdit"
    />
    <Button
      v-if="userSession.session && editMode"
      icon="pi pi-undo"
      severity="secondary"
      rounded
      outlined
      aria-label="Edit"
      class="ml-4"
      @click="editMode = false"
    />
  </div>
</template>
