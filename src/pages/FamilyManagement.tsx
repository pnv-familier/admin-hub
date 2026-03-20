import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Input,
  Badge,
  Card,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from "@/components/common";
import { Search, Plus, Eye, Users, Calendar, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { getFamilies, createFamily, type FamilyItem } from "@/services/familyService";

const PAGE_SIZE = 10;

const FamilyManagement = () => {
  const { getToken } = useAuth();
  const [keyword, setKeyword] = useState("");
  const [inputKeyword, setInputKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [families, setFamilies] = useState<FamilyItem[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedFamily, setSelectedFamily] = useState<FamilyItem | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createForm, setCreateForm] = useState({ familyName: "", ownerEmail: "" });
  const [createError, setCreateError] = useState("");
  const [creating, setCreating] = useState(false);

  const fetchFamilies = useCallback(async () => {
    const token = getToken();
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const data = await getFamilies(token, keyword, currentPage, PAGE_SIZE);
      setFamilies(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to load families");
    } finally {
      setLoading(false);
    }
  }, [keyword, currentPage]);

  useEffect(() => {
    fetchFamilies();
  }, [fetchFamilies]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(0);
    setKeyword(inputKeyword);
  };

  const handleView = (family: FamilyItem) => {
    setSelectedFamily(family);
    setViewModalOpen(true);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.familyName || !createForm.ownerEmail) {
      setCreateError("Please fill in all fields");
      return;
    }
    setCreating(true);
    setCreateError("");
    try {
      await createFamily(getToken()!, createForm);
      setCreateModalOpen(false);
      setCreateForm({ familyName: "", ownerEmail: "" });
      setCurrentPage(0);
      fetchFamilies();
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : "Failed to create family");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Family Management</h1>
          <p className="text-muted-foreground mt-1">Manage all family groups in the system</p>
        </div>
        <Button onClick={() => setCreateModalOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Family
        </Button>
      </div>

      {/* Search */}
      <Card className="p-4">
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="flex-1">
            <Input
              placeholder="Search by family name or owner email..."
              value={inputKeyword}
              onChange={(e) => setInputKeyword(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </Card>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Table */}
      <div className="animate-fade-in">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Family Name</TableHead>
              <TableHead>Owner Email</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  Loading...
                </TableCell>
              </TableRow>
            ) : families.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  No families found
                </TableCell>
              </TableRow>
            ) : (
              families.map((family) => (
                <TableRow key={family.familyId}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium">{family.familyName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{family.ownerEmail}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{family.memberCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{new Date(family.createdAt).toLocaleDateString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={family.status === "ACTIVE" ? "success" : "error"}>
                      {family.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end">
                      <Button variant="ghost" size="icon-sm" onClick={() => handleView(family)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          currentPage={currentPage + 1}
          totalPages={totalPages}
          onPageChange={(p) => setCurrentPage(p - 1)}
          totalItems={totalElements}
          itemsPerPage={PAGE_SIZE}
        />
      </div>

      {/* View Modal */}
      <Modal open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Family Details</ModalTitle>
            <ModalDescription>Detailed information about this family group</ModalDescription>
          </ModalHeader>
          {selectedFamily && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Family Name</p>
                <p className="font-medium">{selectedFamily.familyName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Owner Email</p>
                <p className="font-medium">{selectedFamily.ownerEmail}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Members</p>
                <p className="font-medium">{selectedFamily.memberCount}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant={selectedFamily.status === "ACTIVE" ? "success" : "error"} className="mt-1">
                  {selectedFamily.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="font-medium">{new Date(selectedFamily.createdAt).toLocaleString()}</p>
              </div>
            </div>
          )}
          <ModalFooter>
            <Button variant="outline" onClick={() => setViewModalOpen(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Create Modal */}
      <Modal open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <ModalContent size="sm">
          <ModalHeader>
            <ModalTitle>Add Family</ModalTitle>
            <ModalDescription>Create a new family group</ModalDescription>
          </ModalHeader>
          <form onSubmit={handleCreate} className="space-y-4">
            {createError && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{createError}</span>
              </div>
            )}
            <Input
              label="Family Name"
              placeholder="Nhà Nguyễn"
              value={createForm.familyName}
              onChange={(e) => setCreateForm((f) => ({ ...f, familyName: e.target.value }))}
            />
            <Input
              type="email"
              label="Owner Email"
              placeholder="owner@example.com"
              value={createForm.ownerEmail}
              onChange={(e) => setCreateForm((f) => ({ ...f, ownerEmail: e.target.value }))}
            />
            <ModalFooter>
              <Button type="button" variant="outline" onClick={() => setCreateModalOpen(false)}>Cancel</Button>
              <Button type="submit" loading={creating}>Create</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default FamilyManagement;
