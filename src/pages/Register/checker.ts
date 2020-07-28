const correctName = /^(^[A-Z]{1}[a-z]{1,10}|[А-Я]{1}[а-я]{1,12})$/;

export function checkCorrectName(name: string, value: string): string {
  if (!correctName.test(value)) {
    return `Все плохо у Вас с полем ${name}!`;
  }
  if (value.length < 3) {
    return `Слишком короткое поле ${name} `;
  }
  return null;
}
