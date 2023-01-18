export const ICON_MAP = new Map()

addMap([0, 1], "sun")
addMap([2], "cloud-sun")
addMap([3], "cloud")
addMap([45, 48], "smog")
addMap([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82], "cloud-showers-heavy")
addMap([71, 73, 75, 77, 85, 86], "snowflake")
addMap([95, 96, 99], "cloud-bolt")


function addMap(values, icon) {
    values.forEach(value => {
        ICON_MAP.set(value, icon)
    })
}