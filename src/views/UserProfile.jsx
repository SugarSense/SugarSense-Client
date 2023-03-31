import React, {useEffect, useState} from "react";
import {useAuth} from "../hooks/useAuth";
import {FiCheck, FiMail, FiX, FiXCircle} from "react-icons/fi";
import axios from "axios";
import Cookies from "universal-cookie";
import MultiSelectInput from "../components/MultiSelectInput";
import {Toaster, toast} from "react-hot-toast";
import {enqueueSnackbar, closeSnackbar} from "notistack";

const UserProfile = () => {
  const {user} = useAuth();
  const [avatar, setAvatar] = useState("");
  const [avatarFile, setAvatarFile] = useState("");
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState(null);
  const [sex, setSex] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [doctorName, setDoctorName] = useState(null);
  const [doctorEmail, setDoctorEmail] = useState(null);
  const [doctorAddress, setDoctorAddress] = useState(null);
  const [doctorPhone, setDoctorPhone] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [bloodType, setBloodType] = useState(null);
  const [allergies, setAllergies] = useState(null);
  const [medications, setMedications] = useState(null);
  const [chronicDiseases, setChronicDiseases] = useState(null);
  const [surgery, setSurgery] = useState(null);
  const [vaccinations, setVaccinations] = useState(null);
  const [other, setOther] = useState(null);
  const [loading, setLoading] = useState(true);
  const cookies = new Cookies();

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const formattedValue = inputValue
      .replace(/\s/g, "")
      .replace(/(.{2})/g, "$1 ")
      .trim();
    setPhoneNumber(formattedValue);
  };

  useEffect(() => {
    if (user) {
      setAvatar(user.avatar);
      setEmail(user.email);
      setSex(user.sex);
      setPhoneNumber(user.phoneNumber);
      setDoctorName(user.medical.doctorName);
      setDoctorEmail(user.medical.doctorEmail);
      setDoctorAddress(user.medical.doctorAddress);
      setDoctorPhone(user.medical.doctorPhone);
      setHeight(user.height);
      setWeight(user.weight);
      setBloodType(user.medical.bloodType);
      setAllergies(user.medical.allergies);
      setMedications(user.medical.medications);
      setChronicDiseases(user.medical.chronicDiseases);
      setSurgery(user.medical.surgery);
      setVaccinations(user.medical.vaccinations);
      setOther(user.medical.other);
      setLoading(false);
      console.log(user);
    }
  }, []);

  const handleModify = async (e) => {
    const action = (snackbarId) => (
      <>
        <button
          onClick={() => {
            handleSubmit(e);
            closeSnackbar(snackbarId);
          }}
          style={{
            color: "white",
            backgroundColor: "#358c38",
            borderRadius: "15px",
            padding: "5px",
            marginRight: "10px",
          }}
        >
          <FiCheck size={20} />
        </button>
        <button
          onClick={() => {
            closeSnackbar(snackbarId);
          }}
          style={{
            color: "white",
            backgroundColor: "#f44336",
            borderRadius: "15px",
            padding: "5px",
          }}
        >
          <FiX size={20} />
        </button>
      </>
    );

    enqueueSnackbar("Are you sure of this informations ?", {
      action,
    });
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatar(URL.createObjectURL(file));
    setAvatarFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = cookies.get("auth_token");

    const data = {
      avatar,
      avatarFile,
      sex,
      height,
      weight,
      phoneNumber,
      medical: {
        doctorName,
        doctorEmail,
        doctorAddress,
        doctorPhone,
        bloodType,
        allergies,
        medications,
        chronicDiseases,
        surgery,
        vaccinations,
        other,
      },
    };

    if (token && JSON.stringify(data) !== JSON.stringify(user)) {
      await axios.patch(`${import.meta.env.VITE_API_PATH}/auth/update`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      toast.error("No changes detected");
    }
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="p-4 ml-64 custom-padding-top">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <div className="flex flex-col justify-center">
          <img
            className="h-60 w-60 rounded-full object-cover self-center"
            src={
              avatar ||
              "https://static.vecteezy.com/ti/vecteur-libre/p1/5419157-profil-utilisateur-femme-avatar-est-une-femme-un-personnage-pour-un-economiseur-d-ecran-avec-emotions-illustrationle-sur-fond-blanc-isole-vectoriel.jpg"
            }
            alt="avatar"
          />
          <div className="flex flex-col ml-4">
            <h1 className="text-2xl font-bold mb-6">Your informations</h1>
            <label class="relative inline-flex items-center cursor-pointer mb-4">
              <span class="mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Url
              </span>
              <input
                type="checkbox"
                value=""
                class="sr-only peer"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[33px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                File
              </span>
            </label>
            <form>
              <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <div className="flex flex-col w-full">
                    {checked ? (
                      <>
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          for="file_input"
                        >
                          Upload profile picture
                        </label>
                        <input
                          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                          aria-describedby="file_input_help"
                          id="file_input"
                          type={"file"}
                          onChange={(e) => handleAvatarChange(e)}
                          accept="image/*"
                        />

                        <p
                          class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                          id="file_input_help"
                        >
                          SVG, PNG, JPG or GIF (MAX. 400x400px).
                        </p>
                      </>
                    ) : (
                      <>
                        <div>
                          <label
                            for="profile_picture"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Profile picture URL
                          </label>
                          <input
                            type="url"
                            id="profile_picture"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="https://example.com"
                            value={
                              !loading
                                ? typeof avatar === "string" && avatar
                                : ""
                            }
                            onChange={(e) => setAvatar(e.target.value)}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    for="first_name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={!loading && user.firstname}
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="last_name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={!loading && user.lastname}
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="john.doe@company.com"
                    value={!loading ? email : ""}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="sex"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Sex
                  </label>
                  {/* https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt4_VFq9vjfSb3lkrz48XcaciMD_NA1jsixg&usqp=CAU */}
                  <select
                    id="sex"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={!loading ? sex : ""}
                    onChange={(e) => setSex(e.target.value)}
                  >
                    <option>Choose...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                    for="phone"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="07 45 67 89 01"
                    pattern="[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}"
                    value={!loading ? phoneNumber : ""}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                {/* <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="•••••••••"
                  required
                />
              </div>
              <div>
                <label
                  for="confirm_password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirm_password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="•••••••••"
                  required
                />
              </div> */}
              </div>
              <h1 className="text-2xl font-bold mb-4 mt-9">
                Your medical informations
              </h1>
              <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    for="doctor_name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Doctor
                  </label>
                  <input
                    type="text"
                    id="doctor_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Dr. John Doe"
                    value={!loading ? doctorName : ""}
                    onChange={(e) => setDoctorName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="doctor_email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Doctor email address
                  </label>
                  <input
                    type="email"
                    id="doctor_email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    value={!loading ? doctorEmail : ""}
                    onChange={(e) => setDoctorEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="doctor_address"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Doctor office address
                  </label>
                  <input
                    type="text"
                    id="doctor_address"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="3 rue de la paix, 75000 Paris"
                    value={!loading ? doctorAddress : ""}
                    onChange={(e) => setDoctorAddress(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="doctor_phone"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Doctor phone number
                  </label>
                  <input
                    type="tel"
                    id="doctor_phone"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="07 45 67 89 01"
                    pattern="[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}"
                    value={!loading ? doctorPhone : ""}
                    onChange={(e) => setDoctorPhone(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="height"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Height
                  </label>
                  <input
                    type="number"
                    id="height"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="180 cm"
                    value={!loading ? height : ""}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="weight"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Weight
                  </label>
                  <input
                    type="number"
                    id="weight"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="80 kg"
                    value={!loading ? weight : ""}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="blood_type"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Blood type
                  </label>
                  <input
                    type="text"
                    id="blood_type"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="A+"
                    value={!loading ? bloodType : ""}
                    onChange={(e) => setBloodType(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="allergies"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Allergies
                  </label>
                  <MultiSelectInput
                    id="allergies"
                    setSelectedValues={(e) => setAllergies(e)}
                    selectedValues={!loading ? allergies : []}
                    onChange={(e) => setAllergies(e)}
                    placeholder="Select or add your allergies"
                    options={[
                      {value: "pollen", label: "Pollen"},
                      {value: "milk", label: "Milk"},
                      {value: "eggs", label: "Eggs"},
                      {value: "peanuts", label: "Peanuts"},
                      {value: "wheat", label: "Wheat"},
                      {value: "shellfish", label: "Shellfish"},
                      {value: "soy", label: "Soy"},
                      {value: "fish", label: "Fish"},
                    ]}
                  />
                </div>
                <div>
                  <label
                    for="medications"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Medications
                  </label>
                  <MultiSelectInput
                    id="medications"
                    setSelectedValues={(e) => setMedications(e)}
                    selectedValues={!loading ? medications : []}
                    onChange={(e) => setMedications(e)}
                    placeholder="Select or add your medications"
                    options={[
                      {value: "metformin", label: "Metformin"},
                      {value: "lisinopril", label: "Lisinopril"},
                      {value: "atorvastatin", label: "Atorvastatin"},
                      {value: "levothyroxine", label: "Levothyroxine"},
                      {value: "albuterol", label: "Albuterol"},
                      {value: "warfarin", label: "Warfarin"},
                      {value: "insulin-glargine", label: "Insulin glargine"},
                      {
                        value: "hydrochlorothiazide",
                        label: "Hydrochlorothiazide",
                      },
                      {value: "montelukast", label: "Montelukast"},
                      {value: "gabapentin", label: "Gabapentin"},
                      {value: "omeprazole", label: "Omeprazole"},
                      {value: "losartan", label: "Losartan"},
                    ]}
                  />
                </div>
                <div>
                  <label
                    for="chronic_diseases"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Chronic diseases
                  </label>
                  <MultiSelectInput
                    id="chronic_diseases"
                    setSelectedValues={(e) => setChronicDiseases(e)}
                    selectedValues={!loading ? chronicDiseases : []}
                    onChange={(e) => setChronicDiseases(e)}
                    placeholder="Select or add your chronic diseases"
                    options={[
                      {value: "diabetes", label: "Diabetes"},
                      {value: "hypertension", label: "Hypertension"},
                      {value: "asthma", label: "Asthma"},
                      {value: "hyperlipidemia", label: "Hyperlipidemia"},
                      {value: "depression", label: "Depression"},
                      {value: "anxiety", label: "Anxiety"},
                      {value: "arthritis", label: "Arthritis"},
                      {value: "gout", label: "Gout"},
                      {value: "heart_disease", label: "Heart disease"},
                      {value: "cancer", label: "Cancer"},
                      {value: "kidney_disease", label: "Kidney disease"},
                      {value: "liver_disease", label: "Liver disease"},
                      {value: "thyroid_disease", label: "Thyroid disease"},
                      {value: "stroke", label: "Stroke"},
                      {value: "alzheimer", label: "Alzheimer"},
                      {value: "parkinson", label: "Parkinson"},
                      {value: "epilepsy", label: "Epilepsy"},
                      {
                        value: "multiple_sclerosis",
                        label: "Multiple sclerosis",
                      },
                      {value: "chronic_pain", label: "Chronic pain"},
                    ]}
                  />
                </div>
                <div>
                  <label
                    for="surgery"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Surgery
                  </label>
                  <MultiSelectInput
                    id="surgery"
                    setSelectedValues={(e) => setSurgery(e)}
                    selectedValues={!loading ? surgery : []}
                    onChange={(e) => setSurgery(e)}
                    placeholder="Select or add your surgery"
                    options={[
                      {value: "appendectomy", label: "Appendectomy"},
                      {value: "cholecystectomy", label: "Cholecystectomy"},
                      {value: "hysterectomy", label: "Hysterectomy"},
                      {value: "tonsillectomy", label: "Tonsillectomy"},
                      {value: "tubal_ligation", label: "Tubal ligation"},
                      {value: "mastectomy", label: "Mastectomy"},
                      {
                        value: "coronary_artery_bypass",
                        label: "Coronary artery bypass",
                      },
                      {value: "knee_replacement", label: "Knee replacement"},
                      {value: "hip_replacement", label: "Hip replacement"},
                      {value: "c-section", label: "C-section"},
                      {value: "tonsillectomy", label: "Tonsillectomy"},
                    ]}
                  />
                </div>
                <div>
                  <label
                    for="vaccinations"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Vaccinations
                  </label>
                  <MultiSelectInput
                    id="vaccinations"
                    setSelectedValues={(e) => setVaccinations(e)}
                    selectedValues={!loading ? vaccinations : []}
                    onChange={(e) => setVaccinations(e)}
                    placeholder="Select or add your vaccinations"
                    options={[
                      {value: "flu", label: "Flu"},
                      {value: "pneumonia", label: "Pneumonia"},
                      {value: "shingles", label: "Shingles"},
                      {value: "hpv", label: "HPV"},
                      {value: "tetanus", label: "Tetanus"},
                      {value: "measles", label: "Measles"},
                      {value: "mumps", label: "Mumps"},
                    ]}
                  />
                </div>
                <div>
                  <label
                    for="other"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Other
                  </label>
                  <input
                    type="text"
                    id="other"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Other"
                    value={!loading ? other : ""}
                    onChange={(e) => setOther(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={(e) => handleModify(e)}
              >
                Modify profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
