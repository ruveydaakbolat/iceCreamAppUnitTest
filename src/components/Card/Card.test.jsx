import { render, screen } from "@testing-library/react";
import Card from ".";
import userEvent from "@testing-library/user-event";

const item = {
  name: "Mochi",
  imagePath: "/images/mochi.png",
  id: "be8d",
};

const basket = [
  {
    name: "Mochi",
    imagePath: "/images/mochi.png",
  },
  {
    name: "Mochi",
    imagePath: "/images/mochi.png",
  },
  {
    name: "Cherries",
    imagePath: "/images/cherries.png",
  },
];

test("", async () => {
  const mock = jest.fn();

  render(<Card item={item} basket={basket} setBasket={mock} />);

  // item ın name değeri için ekrana bir span basılır
  screen.getByText(item.name);

  // resmin src'si item ın imagePath değerine uygundur
  const img = screen.getByAltText("çeşit-resim");
  expect(img).toHaveAttribute("src", item.imagePath);

  // toplam ürün bilgisi 2 olmalı
  const amount = screen.getByTestId("amount");
  expect(amount).toHaveTextContent(2);

  // ekle ve sıfırla butonlarına tıklanınca setBasket tetiklenir
  const user = userEvent.setup();
  const addBtn = screen.getByRole("button", { name: /ekle/i });
  const delBtn = screen.getByRole("button", { name: /sıfırla/i });

  // ekle butonuna tıkla
  await user.click(addBtn);

  // setBasket fonksiyonu doğru parametre ile çalıştı mı?
  expect(mock).toHaveBeenCalledWith([...basket, item]);

  // sıfırla butonuna tıkla
  await user.click(delBtn);

  // setBasket doğru parametre ile çalıştı mı?
  expect(mock).toHaveBeenCalledWith([
    {
      name: "Cherries",
      imagePath: "/images/cherries.png",
    },
  ]);
});
