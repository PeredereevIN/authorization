"use client";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { verifyEmailMutationFn } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ConfirmAccount() {
  const router = useRouter();

  const params = useSearchParams();
  const code = params.get("code");

  const { mutate, isPending } = useMutation({
    mutationFn: verifyEmailMutationFn,
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!code) {
      toast({
        title: "Ошибка",
        description: "Токен подтверждения не найден",
        variant: "destructive",
      });
      return;
    }
    mutate(
      { code },

      {
        onSuccess: () => {
          toast({
            title: "Успех",
            description: "Аккаунт успешно подтвержден",
          });
          router.replace("/");
        },
        onError: (error) => {
          toast({
            title: "Ошибка",
            description: error.message || "Что-то пошло не так",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <main className="w-full min-h-[590px] h-full max-w-full flex items-center justify-center ">
      <div className="w-full h-full p-5 rounded-md">
        <Logo />

        <h1
          className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mb-4 mt-8
        text-center sm:text-left"
        >
          Подтверждение аккаунта
        </h1>
        <p className="mb-6 text-center sm:text-left text-[15px] dark:text-[#f1f7feb5] font-normal">
          Для подтверждения аккаунта, пожалуйста, нажмите кнопку ниже.
        </p>
        <form onSubmit={handleSubmit}>
          <Button
            disabled={isPending}
            type="submit"
            className="w-full text-[15px] h-[40px] text-white font-semibold"
          >
            {isPending && <Loader className="animate-spin" />}
            Подтвердить аккаунт
          </Button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
          Если у вас возникли проблемы с подтверждением аккаунта, пожалуйста, свяжитесь с{" "}
          <a
            className="outline-none transition duration-150 ease-in-out 
            focus-visible:ring-2 text-primary hover:underline focus-visible:ring-primary"
            href="#"
          >
            support@AuthGuard.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
