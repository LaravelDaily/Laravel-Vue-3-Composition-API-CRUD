import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default function useCompanies() {
    const companies = ref([]);
    const company = ref([]);
    const router = useRouter();
    const errors = ref("");

    const getCompanies = async () => {
        let response = await axios.get("/api/companies");
        companies.value = response.data.data;
    };

    const getCompany = async (id) => {
        let response = await axios.get("/api/companies/" + id);
        company.value = response.data.data;
    };

    const storeCompany = async (data) => {
        let err = {};
        try {
            await axios.post("/api/companies/", data);
            await router.push({ name: "companies.index" });
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    err[key] = e.response.data.errors[key][0];
                }
                errors.value = err;
            }
        }
    };

    const updateCompany = async (id) => {
        let err = {};
        try {
            await axios.put("/api/companies/" + id, company.value);
            await router.push({ name: "companies.index" });
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    err[key] = e.response.data.errors[key][0];
                }
                errors.value = err;
            }
        }
    };

    const destroyCompany = async (id) => {
        await axios.delete("/api/companies/" + id);
    };

    return {
        companies,
        company,
        errors,
        getCompanies,
        getCompany,
        storeCompany,
        updateCompany,
        destroyCompany,
    };
}
