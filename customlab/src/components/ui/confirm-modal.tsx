"use client"

import { AlertTriangle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  isLoading?: boolean
  variant?: "danger" | "primary"
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  isLoading = false,
  variant = "danger"
}: ConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md overflow-hidden rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className={cn(
              "p-3 rounded-full shrink-0",
              variant === "danger" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
            )}>
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t flex flex-col-reverse sm:flex-row justify-end gap-3 font-medium">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-xl px-6 hover:bg-white border border-transparent hover:border-gray-200 transition-all text-gray-600 hover:text-black"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(
              "min-w-[120px] rounded-xl px-6 h-11 text-white shadow-sm transition-all active:scale-95",
              variant === "danger" ? "bg-red-600 hover:bg-red-700 ring-red-100 focus:ring-4" : "bg-black hover:bg-gray-800 ring-gray-100 focus:ring-4"
            )}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
                Eliminando...
              </>
            ) : (
              confirmText
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
