"use client"

import { AlertTriangle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ConfirmModalProps } from "@/types/confirmModal"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

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
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent showCloseButton={false} className="sm:max-w-md p-0 overflow-hidden border-none shadow-2xl">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className={cn(
              "p-3 rounded-full shrink-0",
              variant === "danger" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
            )}>
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <DialogHeader className="p-0 text-left">
                <DialogTitle className="text-xl font-bold text-gray-900">{title}</DialogTitle>
              </DialogHeader>
              <DialogDescription className="text-sm text-gray-500 leading-relaxed">
                {description}
              </DialogDescription>
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 bg-gray-50 border-t flex flex-col-reverse sm:flex-row justify-end gap-3 font-medium">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-xl px-6 hover:bg-white border border-transparent hover:border-gray-200 transition-all text-gray-600 hover:text-black h-11"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(
              "min-w-[120px] rounded-xl px-6 h-11 text-white shadow-sm transition-all active:scale-95 border-none",
              variant === "danger" ? "bg-red-600 hover:bg-red-700" : "bg-black hover:bg-gray-800"
            )}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
                Procesando...
              </>
            ) : (
              confirmText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
