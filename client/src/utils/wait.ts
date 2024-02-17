async function wait(duration: number) {
  return new Promise(res => {
    setTimeout(() => res("resolved"), duration);
  });
}

export default wait;
