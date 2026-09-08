<script setup lang="ts">
import { bookListStore } from "../store";
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
// import router from "../router"
import { useFetch } from "@vueuse/core";
import { Series, MetadataAuthors } from "../models/models";
import { useToast } from "primevue/usetoast";
const store = bookListStore();
const { metadata } = storeToRefs(store);
const { apiFetch } = store;
const toast = useToast();

dayjs.extend(customParseFormat);
const loading = ref(false);

interface Book {
	title: string | null;
	manga: boolean;
	location_id: number | null;
	label_id: number | null;
	status_id: number;
	series_id: number | null;
	series_no: number | null;
	published: Date | null;
	read: Date | null;
	rating: number | null;
	notes: string | null;
	cover: string | null;
	chil_url: string | null;
}

const bookForm = ref<Book>({
	title: null,
	manga: true,
	location_id: null,
	label_id: null,
	status_id: 1,
	series_id: null,
	series_no: null,
	published: null,
	read: null,
	rating: null,
	notes: null,
	cover: null,
	chil_url: null,
});
const selectedAuthors = ref<number[]>([]);
const selectedSettei = ref<number[]>([]);
const selectedTone = ref<number[]>([]);
const selectedSeme = ref<number[]>([]);
const selectedUke = ref<number[]>([]);
const selectedPlay = ref<number[]>([]);
const selectedTags = ref<number[]>([]);
const imgPreview = ref<string>();
const fetchUrl = ref<string>("");
const missingAuth = ref([]);
const missingSeries = ref("");
const missingSettei = ref([]);
const jsonImport = ref<string>();

const seriesVisible = ref(false);
const authorVisible = ref(false);

const authArray = computed(() => {
	const map = selectedAuthors.value.map((x, index) => ({
		author_id: x,
		order: index + 1,
	}));
	return map;
});

const newAuthor = ref({
	name: null,
	reading: null,
	illustrator: false,
});
const newSeries = ref({
	ja: null,
	complete: false,
});

// async function getImage(url: string) {
//   try {
//     const { data: image } = await useFetch(url, { method: "GET" }).blob()
//     imgPreview.value = URL.createObjectURL(image.value as Blob)
//   } catch (error) {
//     console.log(error)
//   }
// }

function jsonParse() {
	const json = JSON.parse(jsonImport.value as string);
	const label = metadata.value?.labels.find((x: any) => x.ja === json.label);
	const series = metadata.value?.series.find((x: any) => x.ja === json.series);

	missingAuth.value = json.authors.filter(
		(x: any) => !metadata.value?.authors.some((b) => b.name === x),
	)
		? json.authors.filter(
				(x: any) => !metadata.value?.authors.some((b) => b.name === x),
			)
		: [];

	missingSettei.value = json.settei.filter(
		(x: any) => !metadata.value?.settei.some((b) => b.ja === x),
	)
		? json.settei.filter(
				(x: any) => !metadata.value?.settei.some((b) => b.ja === x),
			)
		: [];

	missingSeries.value = metadata.value?.series.find(
		(x: any) => x.ja === json.series,
	)
		? ""
		: json.series;

	const newAuth = json.authors
		.map((x: any) => {
			let item = metadata.value?.authors.find((item) => item.name === x);
			if (item) {
				return item.id;
			}
		})
		.filter((item: any) => item !== undefined);

	const newTone = json.tone
		.map((x: any) => {
			let item = metadata.value?.tone.find((item) => item.ja === x);
			if (item) {
				return item.id;
			}
		})
		.filter((item: any) => item !== undefined);

	const newSeme = json.seme
		.map((x: any) => {
			let item = metadata.value?.seme.find((item) => item.ja === x);
			if (item) {
				return item.id;
			}
		})
		.filter((item: any) => item !== undefined);

	const newUke = json.uke
		.map((x: any) => {
			let item = metadata.value?.uke.find((item) => item.ja === x);
			if (item) {
				return item.id;
			}
		})
		.filter((item: any) => item !== undefined);

	const newSettei = json.settei
		.map((x: any) => {
			let item = metadata.value?.settei.find((item) => item.ja === x);
			if (item) {
				return item.id;
			}
		})
		.filter((item: any) => item !== undefined);

	const newPlay = json.play
		.map((x: any) => {
			let item = metadata.value?.play.find((item) => item.ja === x);
			if (item) {
				return item.id;
			}
		})
		.filter((item: any) => item !== undefined);

	bookForm.value.title = json.title;
	bookForm.value.published = json.release;
	bookForm.value.chil_url = json.chilurl;
	bookForm.value.cover = json.cover;
	bookForm.value.label_id = label ? label.id : null;
	bookForm.value.series_id = series ? series.id : null;
	bookForm.value.manga = JSON.parse(json.manga);
	selectedAuthors.value = newAuth;
	selectedTone.value = newTone;
	selectedSeme.value = newSeme;
	selectedUke.value = newUke;
	selectedSettei.value = newSettei;
	selectedPlay.value = newPlay;

	console.log(json);
}

function goToAmazon() {
	window.open(
		`https://www.amazon.co.jp/s?k=${bookForm.value.title}&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=21O74T07MTUGT&sprefix=9784199011436%2Caps%2C363&ref=nb_sb_noss`,
		"_blank",
	);
}

const showAlert = () => {
	toast.add({
		severity: "success",
		summary: "Info",
		detail: "Book added successfully",
		life: 3000,
	});
};

async function submitSeries() {
	try {
		const { data, isFetching, statusCode } = await apiFetch<Series>("/series", {
			method: "POST",
			body: JSON.stringify(newSeries.value),
		}).json();

		console.log(data.value.data);

		loading.value = isFetching.value;
		if (statusCode.value === 201 && data) {
			metadata.value!.series.push(data.value.data as Series);
			bookForm.value.series_id = data.value?.data.id as number;
		}
	} catch (error) {
		console.log(error);
	} finally {
		newSeries.value.complete = false;
		newSeries.value.ja = null;
		seriesVisible.value = false;
	}
}

async function submitAuthor() {
	try {
		const { data, isFetching, statusCode } = await apiFetch<MetadataAuthors>(
			"/authors",
			{
				method: "POST",
				body: JSON.stringify(newAuthor.value),
			},
		).json();

		console.log(data.value.data);

		loading.value = isFetching.value;
		if (statusCode.value === 201 && data) {
			metadata.value!.authors.push(data.value.data as MetadataAuthors);
			selectedAuthors.value.push(data.value.data.id);
		}
	} catch (error) {
		console.log(error);
	} finally {
		authorVisible.value = false;
		newAuthor.value.name = null;
		newAuthor.value.reading = null;
		newAuthor.value.illustrator = false;
	}
}

async function submitBook() {
	loading.value = true;
	const bodyData = {
		...bookForm.value,
		read: bookForm.value.read
			? dayjs(bookForm.value.read).format("YYYY-MM-DD")
			: null,
		published: bookForm.value.published
			? dayjs(bookForm.value.published).format("YYYY-MM-DD")
			: null,
		authArray: authArray.value,
		selectedTone: [...new Set(selectedTone.value)],
		selectedSeme: [...new Set(selectedSeme.value)],
		selectedUke: [...new Set(selectedUke.value)],
		selectedSettei: [...new Set(selectedSettei.value)],
		selectedPlay: [...new Set(selectedPlay.value)],
		selectedTags: [...new Set(selectedTags.value)],
	};

	try {
		const { isFetching, statusCode } = await apiFetch("/books", {
			method: "POST",
			body: JSON.stringify(bodyData),
		}).json();
		loading.value = isFetching.value;
		if (statusCode.value === 201) {
		}
	} catch (error) {
		console.log(error);
	} finally {
		await store.getBooks();
		clearForm();
		showAlert();

		loading.value = false;
	}
}

const getJSON = async () => {
	const { data, isFetching, statusCode } = await apiFetch(
		`/datafetch?url=${fetchUrl.value}`,
		{
			method: "GET",
		},
	).json();

	if (data.value.data) {
		const label = metadata.value?.labels.find(
			(x: any) => x.ja === data.value.data.label,
		);
		const series = metadata.value?.series.find(
			(x: any) => x.ja === data.value.data.series,
		);

		missingAuth.value = data.value.data.authors.filter(
			(x: any) => !metadata.value?.authors.some((b) => b.name === x),
		)
			? data.value.data.authors.filter(
					(x: any) => !metadata.value?.authors.some((b) => b.name === x),
				)
			: [];

		missingSettei.value = data.value.data.settei.filter(
			(x: any) => !metadata.value?.settei.some((b) => b.ja === x),
		)
			? data.value.data.settei.filter(
					(x: any) => !metadata.value?.settei.some((b) => b.ja === x),
				)
			: [];

		missingSeries.value = metadata.value?.series.find(
			(x: any) => x.ja === data.value.data.series,
		)
			? ""
			: data.value.data.series;

		const newAuth = data.value.data.authors
			.map((x: any) => {
				let item = metadata.value?.authors.find((item) => item.name === x);
				if (item) {
					return item.id;
				}
			})
			.filter((item: any) => item !== undefined);

		const newTone = data.value.data.tone
			.map((x: any) => {
				let item = metadata.value?.tone.find((item) => item.ja === x);
				if (item) {
					return item.id;
				}
			})
			.filter((item: any) => item !== undefined);

		const newSeme = data.value.data.seme
			.map((x: any) => {
				let item = metadata.value?.seme.find((item) => item.ja === x);
				if (item) {
					return item.id;
				}
			})
			.filter((item: any) => item !== undefined);

		const newUke = data.value.data.uke
			.map((x: any) => {
				let item = metadata.value?.uke.find((item) => item.ja === x);
				if (item) {
					return item.id;
				}
			})
			.filter((item: any) => item !== undefined);

		const newSettei = data.value.data.settei
			.map((x: any) => {
				let item = metadata.value?.settei.find((item) => item.ja === x);
				if (item) {
					return item.id;
				}
			})
			.filter((item: any) => item !== undefined);

		bookForm.value.title = data.value.data.title;
		bookForm.value.published = data.value.data.published;
		bookForm.value.label_id = label ? label.id : null;
		bookForm.value.series_id = series ? series.id : null;
		bookForm.value.manga = data.value.data.manga;
		bookForm.value.chil_url = fetchUrl.value;
		selectedAuthors.value = newAuth;
		selectedTone.value = newTone;
		selectedSeme.value = newSeme;
		selectedUke.value = newUke;
		selectedSettei.value = newSettei;
	}
};

function clearForm() {
	bookForm.value = {
		title: null,
		manga: true,
		location_id: null,
		label_id: null,
		status_id: 1,
		series_id: null,
		series_no: null,
		published: null,
		read: null,
		rating: null,
		notes: null,
		cover: null,
		chil_url: null,
	};

	selectedAuthors.value = [];
	selectedPlay.value = [];
	selectedSeme.value = [];
	selectedSettei.value = [];
	selectedTags.value = [];
	selectedTone.value = [];
	selectedUke.value = [];

	missingAuth.value = [];
	missingSeries.value = "";
	missingSettei.value = [];
}
</script>

<template>
  <Tabs value="addbook">
    <TabList>
      <Tab value="addbook">Add book</Tab>
      <Tab value="bulk">Bulk edit</Tab>
    </TabList>
    <TabPanels>
      <TabPanel value="addbook">
        <div v-if="metadata" id="newbookform">
          <div class="mt-4">Add via json </div>
          <Textarea v-model="jsonImport" rows="2" cols="30" />
          <Button
              class="ml-2 mb-8"
              type="button"
              label="Parse data"
              @click="jsonParse"
            ></Button>
                        <Button
              class="ml-2 mb-8"
              type="button"
              label="Clear"
              severity="danger"
              @click="clearForm"
            ></Button>
          <div>Title</div>
          <InputText id="title" v-model="bookForm.title" class="w-4/12" />
          <div class="mt-4">Cover</div>
          <img
            v-if="imgPreview"
            class="object-contain h-96"
            :src="imgPreview"
          />
          <InputGroup class="w-6/12">
            <InputText type="text" v-model="bookForm.cover" />
            <Button
              icon="pi pi-external-link"
              severity="primary"
              @click="goToAmazon"
            />
          </InputGroup>
          <div class="mt-4">Authors</div>
          <MultiSelect
            v-model="selectedAuthors"
            display="chip"
            :options="metadata?.authors"
            option-value="id"
            option-label="name"
            filter
            placeholder="Select authors"
            class="w-6/12 mb-4"
          />
          <Button
            icon="pi pi-plus"
            rounded
            aria-label="Filter"
            @click="authorVisible = true"
            class="ml-4"
          />
          <div v-if="missingAuth">
            <span v-for="auth in missingAuth" class="ml-2">{{ auth }}</span>
          </div>
          <div class="mt-4">Series</div>
          <Select
            v-model="bookForm.series_id"
            :options="metadata.series"
            option-value="id"
            option-label="ja"
            filter
            showClear
            placeholder="Series"
            class="w-4/12 mr-4"
          />
          <Button
            icon="pi pi-plus"
            rounded
            aria-label="Filter"
            @click="seriesVisible = true"
            class="mr-4"
          />
          <InputNumber
            v-model="bookForm.series_no"
            inputId="series_no"
            class="w-2/12"
          />
          <div v-if="missingSeries">{{ missingSeries }}</div>
          <div class="mt-4">Status</div>
          <div class="flex gap-4">
            <div
              v-for="status in metadata.status"
              :key="status.id"
              class="flex items-center"
            >
              <RadioButton
                v-model="bookForm.status_id"
                :inputId="status.id.toString()"
                name="status"
                :value="status.id"
                class=""
              />
              <label :for="status.id.toString()" class="ml-2">{{
                status.en
              }}</label>
            </div>
          </div>
          <ToggleButton
            v-model="bookForm.manga"
            class="w-24 mt-4"
            onLabel="漫画"
            offLabel="小説"
          />
          <div class="mt-4">Location</div>
          <Select
            v-model="bookForm.location_id"
            :options="metadata.locations"
            option-value="id"
            option-label="ja"
            filter
            showClear
            placeholder="Location"
            class="w-4/12 mr-8"
          />
          <div v-if="bookForm.status_id >= 4">
            <div class="mt-4">Date read</div>
            <DatePicker
              v-model="bookForm.read"
              dateFormat="yy/mm/dd"
              showButtonBar
              class=""
            />
            <div class="mt-4">Rating</div>
            <InputNumber
              v-model="bookForm.rating"
              inputId="rating"
              :minFractionDigits="0"
              :maxFractionDigits="1"
              :min="1"
              :max="5"
              class="w-2/12"
            />
          </div>
          <div class="mt-4">Label</div>
          <Select
            v-model="bookForm.label_id"
            :options="metadata.labels"
            option-value="id"
            option-label="ja"
            filter
            showClear
            placeholder="Label"
            class="w-4/12 mr-8"
          />
          <div class="mt-4">Published</div>
          <DatePicker
            v-model="bookForm.published"
            dateFormat="yy/mm/dd"
            showButtonBar
            class=""
          />
          <div class="mt-4">Tone</div>
          <MultiSelect
            v-model="selectedTone"
            display="chip"
            :options="metadata?.tone"
            option-value="id"
            option-label="ja"
            filter
            placeholder="Select tone"
            class="w-6/12 mb-4"
          />
          <div class="mt-4">Seme</div>
          <MultiSelect
            v-model="selectedSeme"
            display="chip"
            :options="metadata?.seme"
            option-value="id"
            option-label="ja"
            filter
            placeholder="Select seme traits"
            class="w-6/12 mb-4"
          />
          <div class="mt-4">Uke</div>
          <MultiSelect
            v-model="selectedUke"
            display="chip"
            :options="metadata?.uke"
            option-value="id"
            option-label="ja"
            filter
            placeholder="Select uke traits"
            class="w-6/12 mb-4"
          />
          <div class="mt-4">Settei</div>
          <MultiSelect
            v-model="selectedSettei"
            display="chip"
            :options="metadata?.settei"
            option-value="id"
            option-label="ja"
            filter
            placeholder="Select tropes/settings"
            class="w-6/12 mb-4"
          />
          <div v-if="missingSettei">
            <span v-for="settei in missingSettei" class="mr-2">{{
              settei
            }}</span>
          </div>
          <div class="mt-4">Play</div>
          <MultiSelect
            v-model="selectedPlay"
            display="chip"
            :options="metadata?.play"
            option-value="id"
            option-label="ja"
            filter
            placeholder="Select play"
            class="w-6/12 mb-4"
          />
          <div class="mt-4">Other tags</div>
          <MultiSelect
            v-model="selectedTags"
            display="chip"
            :options="metadata?.tags"
            option-value="id"
            option-label="ja"
            filter
            placeholder="Select tags"
            class="w-6/12 mb-4"
          />
          <div class="mt-4">Notes</div>
          <Textarea v-model="bookForm.notes" rows="2" cols="30" />
          <div class="mt-4">ちるちる URL</div>
          <InputText type="text" v-model="bookForm.chil_url" class="w-4/12" />
        </div>
        <Button
          type="button"
          label="Save"
          :loading="loading"
          @click="submitBook"
          class="mt-4"
        ></Button>
      </TabPanel>
      <TabPanel value="bulk">
        <p class="m-0">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit,
          sed quia non numquam eius modi.
        </p>
      </TabPanel>
    </TabPanels>
  </Tabs>

  <div></div>
  <Dialog
    v-model:visible="seriesVisible"
    modal
    header="Add new series"
    :style="{ width: '25rem' }"
  >
    <div class="flex items-center gap-4 mb-4">
      <label for="seriesname" class="font-semibold w-24">Series name</label>
      <InputText id="seriesname" class="flex-auto" v-model="newSeries.ja" />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="complete" class="font-semibold w-24">Complete</label>
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
        @click="seriesVisible = false"
      ></Button>
      <Button
        type="button"
        label="Save"
        :disabled="loading"
        @click="submitSeries"
      ></Button>
    </div>
  </Dialog>
  <Dialog
    v-model:visible="authorVisible"
    modal
    header="Add new author"
    :style="{ width: '25rem' }"
  >
    <div class="flex items-center gap-4 mb-4">
      <label for="authorname" class="font-semibold w-24">Author name</label>
      <InputText id="authorname" class="flex-auto" v-model="newAuthor.name" />
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="reading" class="font-semibold w-24">Reading</label>
      <InputText id="reading" class="flex-auto" v-model="newAuthor.reading" />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="complete" class="font-semibold w-24">Illustrator</label>
      <ToggleButton
        v-model="newAuthor.illustrator"
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
        @click="authorVisible = false"
      ></Button>
      <Button type="button" label="Save" @click="submitAuthor"></Button>
    </div>
  </Dialog>

  <Toast />
  <ScrollTop />
</template>
