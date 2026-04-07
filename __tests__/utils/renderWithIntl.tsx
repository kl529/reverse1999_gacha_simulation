import { render, RenderOptions } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { ReactElement } from "react";
import koMessages from "@/messages/ko.json";

interface IntlRenderOptions extends RenderOptions {
  locale?: string;
  messages?: Record<string, unknown>;
}

export function renderWithIntl(
  ui: ReactElement,
  { locale = "ko", messages = koMessages, ...options }: IntlRenderOptions = {}
) {
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {ui}
    </NextIntlClientProvider>,
    options
  );
}
