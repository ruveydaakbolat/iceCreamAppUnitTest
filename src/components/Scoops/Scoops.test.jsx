import { render, screen } from "@testing-library/react";
import Scoops from ".";
import userEvent from "@testing-library/user-event";

test("API'dan gelen veriler için ekrana kartlar basılır", async () => {
  render(<Scoops />);

  // ekrana nasılan kartları al
  const images = await screen.findAllByAltText("çeşit-resim");

  // gelen resimlerin sayısı 1 den büyük mü
  expect(images.length).toBeGreaterThanOrEqual(1);
});

test("Çeşit ekleme ve sıfırlamanın toplama etkisi", async () => {
  render(<Scoops />);
  const user = userEvent.setup();

  // ekle ve sıfırla butonlarını çağır
  const addButtons = await screen.findAllByRole("button", { name: "Ekle" });

  const delButtons = await screen.findAllByRole("button", { name: "Sıfırla" });
  // toplam ı çağır
  const total = screen.getByRole("heading", { name: /Çeşitler Ücreti/i });

  // toplam fiyatı 0 dır
  expect(total).toHaveTextContent('0');

  // ekle butonlarından birine tıkla
  await user.click(addButtons[0]);

  // toplam fiyatı 20 olur
  expect(total).toHaveTextContent(20);

  // farklı bir çeşittten iki tane daha eklenir
  await user.dblClick(addButtons[2]);

  // toplam fiyat 60 olur
  expect(total).toHaveTextContent(60);

  // 1 tane eklenenin sıfırla butonuna tıklanır
  await user.click(delButtons[0]);

  // toplam fiyat 40 olur
  expect(total).toHaveTextContent(40);

  // 2 tane eklenenin sıfırla butonuna tıklanır
  await user.click(delButtons[2]);

  // toplam fiyat 0 olur
  expect(total).toHaveTextContent(0);
});
