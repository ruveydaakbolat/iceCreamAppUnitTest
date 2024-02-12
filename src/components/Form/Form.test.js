import { fireEvent, render, screen } from "@testing-library/react";
import Form from ".";
import userEvent from "@testing-library/user-event";

test("Koşulların onaylanmasına göre buton aktifliği", async () => {
  // test bileşenini ekrana bas
  render(<Form />);

  // user'ın kurulumu
  const user = userEvent.setup();

  // gerekli elemanları al
  const orderBtn = screen.getByRole("button");
  const checkBox = screen.getByRole("checkbox");

  // checkboc başlangıçta tiksiz
  expect(checkBox).not.toBeChecked();

  // button başlangıçta inaktif
  expect(orderBtn).toBeDisabled();

  // checkbox tiklenir
  await user.click(checkBox);

  // button aktif olur
  expect(orderBtn).toBeEnabled();

  // checkbox'tan tik kaldırılır
  await user.click(checkBox);

  // button inaktif olur
  expect(orderBtn).toBeDisabled();
});

test("Onay butonu hover olunca bildirim ekrana gelir", async () => {
    render(<Form />);

    const user = userEvent.setup();

    // gerekli elemanlar
    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole('button');
    // const popup = screen.getByText('Size gerçekten', {exact: false});
    const popup = screen.getByText(/size gerçekten/i);

    // checkbox ı tikle
    await user.click(checkbox);

    // mouse u butonun üzerine getir
    fireEvent.mouseEnter(button);

    // bildirim gözüküyor mu ? 
    expect(popup).toBeVisible();

    // mouse u butondan çek
    fireEvent.mouseLeave(button);

    // popup gözükmez
    expect(popup).not.toBeVisible();
})
