const ref = {
  value: 1,
  getValue() {
    return this.value
  },
  inc() {
    this.value++
  },
}

module.exports = ref
