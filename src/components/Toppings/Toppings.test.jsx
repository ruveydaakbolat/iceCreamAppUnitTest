import { screen, render } from "@testing-library/react"
import Toppings from "."
import userEvent from '@testing-library/user-event';

test("sosları ekleme çıkarma işlemi fiyatı etkiler", async () => {
    render(<Toppings />);

    const user = userEvent.setup();
    
    // toplam ücret sıfır mı
    const total = screen.getByRole("heading", { name:/Soslar Ücreti/i});

    expect(total).toHaveTextContent(0);

    // bütün sosların checkbox'larını çağır
    const toppings = await screen.findAllByRole("checkbox")

    // soslardan bir tanesini seç
    await user.click(toppings[0])

    // total 3 e eşit mi
    expect(total).toHaveTextContent(3);

    // 3. sosu sepete ekle
    await user.click(toppings[2]);

    // total 6 ya eşit mi
    expect(total).toHaveTextContent(6);

    // soslardan ilk ekleneni kaldır
    await user.click(toppings[0]);

    // total 3 e eşit mi
    expect(total).toHaveTextContent(3);

    // ikinci eklenen sosu kaldır
    await user.click(toppings[2]);

    // total 0 a eşit mi
    expect(total).toHaveTextContent(0);

})

test("API'dan gelen soslar için ekrana kartlar basılıyor mu?", async () => {
    render(<Toppings />)

    const images = await screen.findAllByAltText('sos-resim');

    expect(images.length).toBeGreaterThanOrEqual(1);
})