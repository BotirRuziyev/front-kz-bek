<template>
  <div class="telegram-auth">
    <div class="main-container">
      <div class="telegram-auth__content">
        <div class="telegram-auth__header">
          <TelegramIcon class="telegram-icon" />
          <Logo />
        </div>
        <h1 class="telegram-auth-title">
          Log in to use your Telegram<br />
          account with example.com and SampleBot
        </h1>
        <p class="telegram-auth-description">
          Please enter your phone number in the international format and we will
          send a confirmation message to your account via Telegram.
        </p>
        <!-- <div class="code">
          {{ countries }}
        </div> -->
        <div class="phone-wrapper">
          <div class="form-select__phone">
            <label
              class="form-select__label"
              :class="{ float: selectedCountry }"
              >Country</label
            >
            <button class="select-btn" @click="selectCountry = !selectCountry">
              <span class="countr-name" :class="{ show: selectedCountry }">{{
                selectedCountry?.name
              }}</span>
              <span
                class="arrow-icon"
                :class="{ active: selectCountry }"
              ></span>
            </button>
            <div class="select-menu" :class="{ show: selectCountry }">
              <input-oracle
                :v="searchTerm"
                :search="true"
                placeholder="Search..."
                @changed="filterCountries"
              />
              <div
                v-for="(country, i) in filteredCountries"
                :key="i"
                class="select-option"
                @click="onCountrySelect(country)"
              >
                <div class="left-block">
                  <span class="flag">
                    <img :src="country.flag" alt="" />
                  </span>
                  <p class="select-option__name">
                    {{ country.name }}
                  </p>
                </div>
                <p class="select-option__code">
                  {{ country.code }}
                </p>
              </div>
            </div>
          </div>

          <div class="form-group">
            <input
              ref="codeInput"
              v-model="codeInput"
              class="form-input code-input"
              type="tel"
              inputmode="tel"
              pattern="^\+?[0-9]*$"
              placeholder="+7"
              @input="onCodeRestrictedInput"
            />

            <input
              ref="phoneInput"
              v-model="phoneNumberRaw"
              class="form-input"
              type="tel"
              inputmode="tel"
              pattern="^\+?[0-9]*$"
              :placeholder="phonePlaceholder"
              :maxlength="phoneInputMaxLength"
              @input="onPhoneNumberInput"
              @keydown="onPhoneKeyDown"
            />
          </div>
        </div>
      </div>
      <div class="telegram-auth__button">
        <new-oracle-button text="Cancel" />
        <new-oracle-button
          :to="
            phoneInputMaxLength === phoneNumberRaw.length
              ? '/moresettings/privacy-security/telegram-auth/pin-code'
              : ''
          "
          text="Next"
          color="yellow"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { AsYouType, CountryCode, getExampleNumber } from 'libphonenumber-js'
import examples from 'libphonenumber-js/examples.mobile.json'
import rawCountries from '~/assets/phone-countries'
// @ts-ignore
import TelegramIcon from '@/assets/svg/telegram-original.svg?inline'
// @ts-ignore
import Logo from '@/assets/svg/logo.svg?inline'

interface Country {
  name: string
  code: string
  flag: string
  iso2: string
  region: string
}

@Component({
  components: {
    TelegramIcon,
    Logo,
  },
})
export default class TelegramAuthPage extends Vue {
  phoneNumberRaw: string = ''
  phoneInputMaxLength: number = 9
  phonePlaceholder: string = '00 000 00 00'
  codeInput: string = ''
  searchTerm: string = ''
  selectCountry: boolean = false
  countries: Country[] = []
  filteredCountries: Country[] = []
  selectedCountry: Country | null = null

  mounted() {
    this.countries = rawCountries.map((entry: any[]) => {
      const [name, mass, iso2, dialCode] = entry
      return {
        name,
        code: `+${dialCode}`,
        flag: `https://flagcdn.com/256x192/${iso2}.png`,
        iso2,
        region: mass?.[0] || '',
      }
    })

    this.filteredCountries = this.countries
  }

  filterCountries(val: string) {
    this.searchTerm = val
    const term = this.searchTerm.toLowerCase()
    this.filteredCountries = this.countries.filter(
      (c) => c.name.toLowerCase().includes(term) || c.code.includes(term)
    )
  }

  onCountrySelect(country: Country) {
    this.selectCountry = false
    this.selectedCountry = country
    this.codeInput = country.code
    this.$nextTick(() => {
      const phoneInput = this.$refs.phoneInput as HTMLInputElement
      phoneInput?.focus()
    })
  }

  onCodeRestrictedInput(event: Event) {
    const input = event.target as HTMLInputElement

    let value = input.value.replace(/[^\d+]/g, '')

    if (value.includes('+')) {
      value = '+' + value.replace(/\+/g, '')
    }

    this.codeInput = value
    this.onCodeInput()
  }

  onCodeInput() {
    if (!this.codeInput.startsWith('+')) {
      this.codeInput = '+' + this.codeInput.replace(/[^0-9]/g, '')
    }

    const matches = this.countries.filter((c) => c.code === this.codeInput)

    const found =
      matches.find((c) => c.name === 'Russia' || c.name === 'United States') ||
      matches[0] ||
      null

    this.selectedCountry = found

    if (found) {
      this.phonePlaceholder = this.getExamplePlaceholder(found.iso2)

      this.$nextTick(() => {
        const phoneInput = this.$refs.phoneInput as HTMLInputElement
        phoneInput?.focus()
      })
    }
  }

  onPhoneNumberInput(event: Event) {
    if (!this.selectedCountry) return

    const input = event.target as HTMLInputElement

    const digitsOnly = input.value.replace(/\D/g, '')

    const formatter = new AsYouType(
      this.selectedCountry.iso2.toUpperCase() as CountryCode
    )

    this.phoneNumberRaw = formatter.input(digitsOnly)

    this.$nextTick(() => {
      input.value = this.phoneNumberRaw
    })
  }

  onPhoneKeyDown(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      const input = event.target as HTMLInputElement

      const rawValue = input.value

      const digitsOnly = rawValue.replace(/\D/g, '')

      if (digitsOnly.length === 0) {
        setTimeout(() => {
          const stillRaw = input.value.replace(/\D/g, '')
          if (stillRaw.length === 0) {
            const codeInput = this.$refs.codeInput as HTMLInputElement
            codeInput?.focus({ preventScroll: true })
          }
        }, 0)
      }
    }
    if (event.key !== 'Backspace') return

    const input = event.target as HTMLInputElement
    const raw = input.value
    const cursor = input.selectionStart || 0

    const chars = raw.split('')

    const isDigit = (ch: string) => /\d/.test(ch)

    let deleteIndex = cursor - 1
    while (deleteIndex >= 0 && !isDigit(chars[deleteIndex])) {
      deleteIndex--
    }

    if (deleteIndex >= 0) {
      event.preventDefault()

      chars.splice(deleteIndex, 1)

      const digitsOnly = chars.join('').replace(/\D/g, '')

      const formatter = new AsYouType(
        this.selectedCountry?.iso2.toUpperCase() as CountryCode
      )

      const formatted = formatter.input(digitsOnly)

      this.phoneNumberRaw = formatted

      this.$nextTick(() => {
        input.value = formatted
        const newCursor = Math.min(deleteIndex, formatted.length)
        input.setSelectionRange(newCursor, newCursor)
      })
    }
  }

  getExamplePlaceholder(iso2: string): string {
    try {
      const countryCode = iso2.toUpperCase() as CountryCode
      const example = getExampleNumber(countryCode, examples)

      if (!example) return ''

      return example.formatNational().replace(/\d/g, '0')
    } catch (error) {
      return ''
    }
  }

  formatRussianPhone(input: string): string {
    const digits = input.replace(/\D/g, '').slice(0, 10)

    const parts = [
      digits.slice(0, 3),
      digits.slice(3, 6),
      digits.slice(6, 8),
      digits.slice(8, 10),
    ]

    let formatted = ''
    if (parts[0]) formatted += `(${parts[0]}`
    if (parts[0].length === 3) formatted += `)`
    if (parts[1]) formatted += ` ${parts[1]}`
    if (parts[2]) formatted += `-${parts[2]}`
    if (parts[3]) formatted += `-${parts[3]}`

    return formatted
  }

  @Watch('selectedCountry')
  onSelectedCountryChange(newCountry: Country | null) {
    if (!newCountry) return

    const iso2 = newCountry.iso2.toUpperCase()

    if (iso2 === 'RU') {
      this.phoneNumberRaw = this.formatRussianPhone(this.phoneNumberRaw)
      this.phonePlaceholder = '000 000-00-00'
      this.phoneInputMaxLength = 13
    } else {
      const formatter = new AsYouType(iso2 as CountryCode)
      this.phoneNumberRaw = formatter.input(this.phoneNumberRaw)
      this.phonePlaceholder = this.getExamplePlaceholder(newCountry.iso2)
      this.phoneInputMaxLength = this.phonePlaceholder.length
    }
  }
}
</script>

<style lang="scss">
.telegram-auth {
  .main-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 25px;
    padding: 24px 16px;
  }
  &__content {
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px 0 120px;
  }
  &__header {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 24px;
    svg {
      width: 64px;
      height: 64px;
    }
  }
  &-title {
    margin-bottom: 32px;
    font-family: 'Hector', sans-serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 120%;
    text-align: center;
    color: #fff;
  }
  &-description {
    margin-bottom: 48px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 135%;
    text-align: center;
    color: #fff;
  }
  .code {
    color: #fff;
  }
  .phone-wrapper {
    width: 100%;
    .form-select__phone {
      position: relative;
      .form-select__label {
        position: absolute;
        top: 15px;
        left: 16px;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #7a74ba;
        transition: 0.2s;
        &.float {
          top: calc(0px - 18px);
          left: 0;
        }
      }
      .select-btn {
        width: 100%;
        min-height: 48px;
        border-bottom: 1px solid #2b2741;
        padding: 0px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        cursor: pointer;
        transition: 0.2s;

        .countr-name {
          opacity: 0;
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 130%;
          color: #fff;
          transition: 0.2s;
          &.show {
            opacity: 1;
          }
        }
        .arrow-icon {
          width: 20px;
          height: 20px;
          background: url('@/assets/svg/arrow-left.svg') no-repeat center/8px;
          transition: 0.2s;
          &.active {
            transform: rotate(90deg);
          }
        }
      }
      .select-menu {
        width: 100%;
        max-height: 264px;
        position: absolute;
        top: calc(100% + 20px);
        left: 0;
        background: #000;
        opacity: 0;
        visibility: hidden;
        transition: 0.2s;
        overflow-y: auto;

        &::-webkit-scrollbar {
          width: 0;
        }
        &.show {
          top: 100%;
          opacity: 1;
          visibility: visible;
        }

        .input {
          padding: 10px 0 0 0;
          margin-bottom: 10px;
          position: sticky;
          top: 0;
          background: #000;
          input {
            height: 36px;
            border-radius: 10px;
            font-weight: 400;
            &::placeholder {
              font-weight: 400;
            }
          }
        }

        .select-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          border-bottom: 1px solid #2b2741;
          cursor: pointer;
          transition: 0.2s;
          &:last-child {
            border: 0;
          }
          &:hover {
            background: #2b2741;
          }
          .left-block {
            display: flex;
            align-items: center;
            gap: 15px;
            .flag {
              img {
                height: 20px;
              }
            }
          }
          &__name {
            font-family: 'Roboto', sans-serif;
            font-weight: 400;
            font-size: 14px;
            line-height: 130%;
            color: #fff;
          }
          &__code {
            font-family: 'Roboto', sans-serif;
            font-weight: 400;
            font-size: 14px;
            line-height: 130%;
            color: #fff;
          }
        }
      }
    }
    .form-group {
      display: flex;
      gap: 4px;
      .form-input {
        width: 100%;
        background: transparent;
        border: 0;
        border-bottom: 1px solid #2b2741;
        padding: 15px 16px;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 130%;
        color: #f64e2a;
        &:focus {
          outline: none;
        }
        &.code-input {
          max-width: 108px;
        }
        &::placeholder {
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 130%;
          color: #7a74ba;
        }
      }
    }
  }
  &__button {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .new-oracle-button {
      line-height: 22px;
      padding: 11px;
    }
  }
}
</style>
