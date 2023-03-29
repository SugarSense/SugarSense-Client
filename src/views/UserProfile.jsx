import React, {useEffect, useState} from "react";
import {useAuth} from "../hooks/useAuth";
import {FiMail} from "react-icons/fi";

const UserProfile = () => {
  const {user} = useAuth();
  const [avatar, setAvatar] = useState(null);
  const [checked, setChecked] = useState(false);
  const [url, setUrl] = useState(null);
  // const [firstname, setFirstname] = useState(null);
  // const [lastname, setLastname] = useState(null);
  const [email, setEmail] = useState(null);
  // const [password, setPassword] = useState(null);
  // const [passwordConfirmation, setPasswordConfirmation] = useState(null);
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

  useEffect(() => {
    if (user) {
      setUrl(user.avatar);
      // setFirstname(user.firstname);
      // setLastname(user.lastname);
      setEmail(user.email);
      // setPassword(user.password);
      // setPasswordConfirmation(user.password);
      setSex(user.sex);

      setDoctorName(user.doctorName);
      setDoctorEmail(user.doctorEmail);
      setDoctorAddress(user.doctorAddress);
      setDoctorPhone(user.doctorPhone);
      setHeight(user.height);
      setWeight(user.weight);
      setBloodType(user.bloodType);
      setAllergies(user.allergies);
      setMedications(user.medications);
      setChronicDiseases(user.chronicDiseases);
      setSurgery(user.surgery);
      setVaccinations(user.vaccinations);
      setOther(user.other);
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="p-4 ml-64 custom-padding-top">
      <h1 className="text-3xl font-bold">My Profile</h1>
      <div className="flex flex-col justify-center">
        <img
          className="h-60 w-60 rounded-full object-cover self-center"
          src={
            user.avatar ||
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
                        onChange={(e) => setAvatar(e.target.files[0])}
                        value={!loading && avatar}
                      />
                      <p
                        class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                        id="file_input_help"
                      >
                        SVG, PNG, JPG or GIF (MAX. 800x400px).
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
                          type="text"
                          id="profile_picture"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="https://example.com"
                          value={!loading ? url : ""}
                          onChange={(e) => setUrl(e.target.value)}
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
                <select
                  id="sex"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={!loading ? sex : ""}
                  onChange={(e) => setSex(e.target.value)}
                >
                  <option selected>Choose...</option>
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
                  onChange={(e) => setPhoneNumber(e.target.value)}
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
                  type="url"
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
                <input
                  type="text"
                  id="allergies"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Pollen, peanuts, ..."
                  value={!loading ? allergies : ""}
                  onChange={(e) => setAllergies(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="medications"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Medications
                </label>
                <input
                  type="text"
                  id="medications"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Aspirin, ..."
                  value={!loading ? medications : ""}
                  onChange={(e) => setMedications(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="chronic_diseases"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Chronic diseases
                </label>
                <input
                  type="text"
                  id="chronic_diseases"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Diabetes, ..."
                  value={!loading ? chronicDiseases : ""}
                  onChange={(e) => setChronicDiseases(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="surgery"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Surgery
                </label>
                <input
                  type="text"
                  id="surgery"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Appendix, ..."
                  value={!loading ? surgery : ""}
                  onChange={(e) => setSurgery(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="vaccinations"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Vaccinations
                </label>
                <input
                  type="text"
                  id="vaccinations"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Flu, ..."
                  value={!loading ? vaccinations : ""}
                  onChange={(e) => setVaccinations(e.target.value)}
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
            >
              Modify profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
