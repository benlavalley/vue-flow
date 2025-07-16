echo "Creating distribution directory..." && \
rm -rf dist && \
mkdir -p dist && \
for dir in packages/*/; do 
    pkg=$(basename "$dir")
    mkdir -p "dist/$pkg"
    # Copy everything except node_modules and .turbo
    rsync -av --exclude='node_modules' --exclude='.turbo' "$dir" "dist/$pkg/" 2>/dev/null || \
    # Fallback to find/cp if rsync is not available
    (cd "$dir" && find . -type d \( -name node_modules -o -name .turbo \) -prune -o -type f -print0 | \
     xargs -0 -I {} cp --parents {} "../../dist/$pkg/" 2>/dev/null)
done
echo "Distribution directory created successfully."