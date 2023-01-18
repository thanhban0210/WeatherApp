import "./style.css"
import { getWeather } from "./weather"
import { ICON_MAP } from "./iconMap"

navigator.geolocation.getCurrentPosition(positionSuccess, positionError)

function positionSuccess({ coords }) {
    getWeather(coords.latitude, coords.longitude, Intl.DateTimeFormat().resolvedOptions().timeZone)
        .then(
            renderWeather
        )
        .catch(e => {
            console.error(e)
            alert("Error getting weather data!")
        })
}

function positionError() {
    alert("There was an error when we try to get your location. Please allow us to use your location to get the weather's information.")
}
// getWeather(29.71, -95.64, Intl.DateTimeFormat().resolvedOptions().timeZone)
//     .then(
//         renderWeather
//     )
//     .catch(e => {
//         console.error(e)
//         alert("Error getting weather data!")
//     })

function renderWeather({ current, daily, hourly }) {
    renderCurrentWeather(current)
    renderDailyWeather(daily)
    renderHourlyWeather(hourly)
    document.body.classList.remove("blurred")
}
function helper(selector, value, { parent = document } = {}) {
    parent.querySelector(`[data-${selector}]`).textContent = value
}

function getIconUrl(iconCode) {
    return `public/icon/${ICON_MAP.get(iconCode)}.svg`

}


function renderCurrentWeather(current) {
    document.querySelector("[data-current-icon]").src = getIconUrl(current.iconCode)
    getIconUrl(current.iconCode)
    helper("current-temp", current.currentTemp)
    helper("current-high", current.highTemp)
    helper("current-low", current.lowTemp)
    helper("current-fl-high", current.highFL)
    helper("current-fl-low", current.lowFL)
    helper("current-wind", current.windspeed)
    helper("current-precip", current.precip)
}

const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, { weekday: "long" })
const dailySection = document.querySelector("[data-day-section]")
const dayCardTemplate = document.getElementById("day-card-template")
function renderDailyWeather(daily) {
    dailySection.innerHTML = ""
    daily.forEach(day => {
        const element = dayCardTemplate.content.cloneNode(true)
        helper("temp", day.maxTemp, { parent: element })
        helper("date", DAY_FORMATTER.format(day.timestamp), { parent: element })
        element.querySelector("[data-icon]").src = getIconUrl(day.iconCode)
        dailySection.append(element)
    })
}
const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, { hour: "numeric" })
const hourlySection = document.querySelector("[data-hour-section]")
const hourRowTemplate = document.getElementById("hour-row-template")
function renderHourlyWeather(hourly, current) {
    hourlySection.innerHTML = ""
    hourly.forEach(hour => {
        const element = hourRowTemplate.content.cloneNode(true)
        helper("day", DAY_FORMATTER.format(hour.timestamp), { parent: element })
        helper("time", HOUR_FORMATTER.format(hour.timestamp), { parent: element })
        element.querySelector("[data-icon]").src = getIconUrl(hour.iconCode)
        helper("temp", hour.temp, { parent: element })
        helper("fl-temp", hour.fl, { parent: element })
        helper("wind", hour.windSpeed, { parent: element })
        helper("precip", hour.precip, { parent: element })
        hourlySection.append(element)
    })
}